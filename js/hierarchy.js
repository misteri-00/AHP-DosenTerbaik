/**
 * Hierarchy Setup module for AHP application
 * Handles dynamic criteria and alternatives management
 */
class HierarchySetup {
    constructor() {
        this.setupEventListeners();
    }

    /**
     * Setup all event listeners for hierarchy management
     */
    setupEventListeners() {
        // Goal input
        const goalInput = document.getElementById('goal-input');
        if (goalInput) {
            goalInput.addEventListener('blur', () => {
                const goal = goalInput.value.trim();
                if (goal) {
                    window.ahpData.setGoal(goal);
                    this.updateHierarchySummary();
                }
            });
        }

        // Criteria management
        document.getElementById('add-criterion')?.addEventListener('click', () => this.showAddCriterionForm());
        document.getElementById('save-criterion')?.addEventListener('click', () => this.saveCriterion());
        document.getElementById('cancel-criterion')?.addEventListener('click', () => this.hideAddCriterionForm());

        // Alternatives management
        document.getElementById('add-alternative')?.addEventListener('click', () => this.showAddAlternativeForm());
        document.getElementById('save-alternative')?.addEventListener('click', () => this.saveAlternative());
        document.getElementById('cancel-alternative')?.addEventListener('click', () => this.hideAddAlternativeForm());

        // Enter key support for forms
        document.getElementById('new-criterion-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveCriterion();
        });
        
        document.getElementById('new-alternative-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveAlternative();
        });
    }

    /**
     * Initialize the hierarchy setup UI
     */
    initializeUI() {
        this.updateCriteriaList();
        this.updateAlternativesList();
        this.updateHierarchySummary();
        
        // Set goal input
        const goalInput = document.getElementById('goal-input');
        if (goalInput) {
            goalInput.value = window.ahpData.getGoal();
        }
    }

    /**
     * Update criteria list display
     */
    updateCriteriaList() {
        const container = document.getElementById('criteria-list');
        if (!container) return;

        const criteria = window.ahpData.getCriteria();
        
        let html = '';
        criteria.forEach((criterion, index) => {
            html += `
                <div class="criteria-item flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <span class="font-medium text-blue-800">K${index + 1}</span>
                        <input type="text" 
                               class="criterion-name-input bg-transparent border-none p-1 text-gray-800 font-medium focus:outline-none focus:bg-white focus:border focus:border-blue-500 focus:rounded" 
                               value="${criterion}" 
                               data-index="${index}"
                               onblur="window.hierarchySetup.updateCriterionName(${index}, this.value)">
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="window.hierarchySetup.editCriterion(${index})" 
                                class="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors">
                            ✏️
                        </button>
                        <button onclick="window.hierarchySetup.removeCriterion(${index})" 
                                class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition-colors"
                                ${criteria.length <= 2 ? 'disabled title="Minimal 2 kriteria diperlukan"' : ''}>
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    /**
     * Update alternatives list display
     */
    updateAlternativesList() {
        const container = document.getElementById('alternatives-list');
        if (!container) return;

        const alternatives = window.ahpData.getAlternatives();
        
        let html = '';
        alternatives.forEach((alternative, index) => {
            html += `
                <div class="alternative-item flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <span class="font-medium text-green-800">A${index + 1}</span>
                        <input type="text" 
                               class="alternative-name-input bg-transparent border-none p-1 text-gray-800 font-medium focus:outline-none focus:bg-white focus:border focus:border-green-500 focus:rounded" 
                               value="${alternative}" 
                               data-index="${index}"
                               onblur="window.hierarchySetup.updateAlternativeName(${index}, this.value)">
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="window.hierarchySetup.editAlternative(${index})" 
                                class="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-100 transition-colors">
                            ✏️
                        </button>
                        <button onclick="window.hierarchySetup.removeAlternative(${index})" 
                                class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition-colors"
                                ${alternatives.length <= 2 ? 'disabled title="Minimal 2 alternatif diperlukan"' : ''}>
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    /**
     * Update hierarchy summary display
     */
    updateHierarchySummary() {
        const container = document.getElementById('hierarchy-summary');
        if (!container) return;

        const summary = window.ahpData.getHierarchySummary();
        
        const html = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">${summary.criteriaCount}</div>
                    <div class="text-sm">Kriteria</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-green-600">${summary.alternativeCount}</div>
                    <div class="text-sm">Alternatif</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-purple-600">${summary.totalMatrices}</div>
                    <div class="text-sm">Total Matriks</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-orange-600">${summary.totalComparisons}</div>
                    <div class="text-sm">Total Perbandingan</div>
                </div>
            </div>
            <div class="mt-4 text-center">
                <p class="text-sm text-gray-600"><strong>Tujuan:</strong> ${summary.goal}</p>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Show add criterion form
     */
    showAddCriterionForm() {
        const form = document.getElementById('add-criterion-form');
        const input = document.getElementById('new-criterion-input');
        
        if (form && input) {
            form.classList.remove('hidden');
            input.value = '';
            input.focus();
        }
    }

    /**
     * Hide add criterion form
     */
    hideAddCriterionForm() {
        const form = document.getElementById('add-criterion-form');
        if (form) {
            form.classList.add('hidden');
        }
    }

    /**
     * Save new criterion
     */
    saveCriterion() {
        const input = document.getElementById('new-criterion-input');
        if (!input) return;

        const name = input.value.trim();
        if (!name) {
            this.showMessage('Nama kriteria tidak boleh kosong!', 'error');
            return;
        }

        try {
            window.ahpData.addCriterion(name);
            this.updateCriteriaList();
            this.updateHierarchySummary();
            this.hideAddCriterionForm();
            this.showMessage(`Kriteria "${name}" berhasil ditambahkan!`, 'success');
            
            // Notify other modules to update their UI
            this.notifyHierarchyChange();
            
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    /**
     * Remove criterion
     */
    removeCriterion(index) {
        const criteria = window.ahpData.getCriteria();
        if (criteria.length <= 2) {
            this.showMessage('Minimal harus ada 2 kriteria!', 'warning');
            return;
        }

        const criterionName = criteria[index];
        if (!confirm(`Apakah Anda yakin ingin menghapus kriteria "${criterionName}"?`)) {
            return;
        }

        try {
            window.ahpData.removeCriterion(index);
            this.updateCriteriaList();
            this.updateHierarchySummary();
            this.showMessage(`Kriteria "${criterionName}" berhasil dihapus!`, 'success');
            
            // Notify other modules to update their UI
            this.notifyHierarchyChange();
            
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    /**
     * Update criterion name
     */
    updateCriterionName(index, newName) {
        if (!newName || newName.trim() === '') return;

        try {
            window.ahpData.updateCriterion(index, newName.trim());
            this.updateCriteriaList();
            this.updateHierarchySummary();
            this.showMessage(`Nama kriteria berhasil diperbarui!`, 'success');
            
            // Notify other modules to update their UI
            this.notifyHierarchyChange();
            
        } catch (error) {
            this.showMessage(error.message, 'error');
            this.updateCriteriaList(); // Reset to original value
        }
    }

    /**
     * Edit criterion (focus input)
     */
    editCriterion(index) {
        const input = document.querySelector(`input[data-index="${index}"].criterion-name-input`);
        if (input) {
            input.focus();
            input.select();
        }
    }

    /**
     * Show add alternative form
     */
    showAddAlternativeForm() {
        const form = document.getElementById('add-alternative-form');
        const input = document.getElementById('new-alternative-input');
        
        if (form && input) {
            form.classList.remove('hidden');
            input.value = '';
            input.focus();
        }
    }

    /**
     * Hide add alternative form
     */
    hideAddAlternativeForm() {
        const form = document.getElementById('add-alternative-form');
        if (form) {
            form.classList.add('hidden');
        }
    }

    /**
     * Save new alternative
     */
    saveAlternative() {
        const input = document.getElementById('new-alternative-input');
        if (!input) return;

        const name = input.value.trim();
        if (!name) {
            this.showMessage('Nama alternatif tidak boleh kosong!', 'error');
            return;
        }

        try {
            window.ahpData.addAlternative(name);
            this.updateAlternativesList();
            this.updateHierarchySummary();
            this.hideAddAlternativeForm();
            this.showMessage(`Alternatif "${name}" berhasil ditambahkan!`, 'success');
            
            // Notify other modules to update their UI
            this.notifyHierarchyChange();
            
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    /**
     * Remove alternative
     */
    removeAlternative(index) {
        const alternatives = window.ahpData.getAlternatives();
        if (alternatives.length <= 2) {
            this.showMessage('Minimal harus ada 2 alternatif!', 'warning');
            return;
        }

        const alternativeName = alternatives[index];
        if (!confirm(`Apakah Anda yakin ingin menghapus alternatif "${alternativeName}"?`)) {
            return;
        }

        try {
            window.ahpData.removeAlternative(index);
            this.updateAlternativesList();
            this.updateHierarchySummary();
            this.showMessage(`Alternatif "${alternativeName}" berhasil dihapus!`, 'success');
            
            // Notify other modules to update their UI
            this.notifyHierarchyChange();
            
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    /**
     * Update alternative name
     */
    updateAlternativeName(index, newName) {
        if (!newName || newName.trim() === '') return;

        try {
            window.ahpData.updateAlternative(index, newName.trim());
            this.updateAlternativesList();
            this.updateHierarchySummary();
            this.showMessage(`Nama alternatif berhasil diperbarui!`, 'success');
            
            // Notify other modules to update their UI
            this.notifyHierarchyChange();
            
        } catch (error) {
            this.showMessage(error.message, 'error');
            this.updateAlternativesList(); // Reset to original value
        }
    }

    /**
     * Edit alternative (focus input)
     */
    editAlternative(index) {
        const input = document.querySelector(`input[data-index="${index}"].alternative-name-input`);
        if (input) {
            input.focus();
            input.select();
        }
    }

    /**
     * Validate hierarchy
     */
    validateHierarchy() {
        const validation = window.ahpData.validateHierarchy();
        
        if (validation.isValid) {
            this.showMessage('Hierarki valid dan siap untuk perhitungan AHP!', 'success');
        } else {
            const errorMessage = 'Hierarki tidak valid:\n' + validation.errors.join('\n');
            this.showMessage(errorMessage, 'error');
        }
        
        return validation.isValid;
    }

    /**
     * Notify other modules about hierarchy changes
     */
    notifyHierarchyChange() {
        // Reset calculation results
        window.ahpCalculator?.reset();
        
        // Update matrix UI if on those tabs
        if (window.ahpApp) {
            if (window.ahpApp.currentTab === 'criteria') {
                window.ahpApp.updateCriteriaMatrix();
            } else if (window.ahpApp.currentTab === 'alternatives') {
                window.ahpApp.updateAlternativeMatrices();
            }
        }
    }

    /**
     * Show message notification
     */
    showMessage(message, type = 'info') {
        if (window.ahpApp && window.ahpApp.showNotification) {
            window.ahpApp.showNotification(message, type);
        } else {
            // Fallback to alert
            alert(message);
        }
    }

    /**
     * Load default hierarchy
     */
    loadDefaultHierarchy() {
        try {
            // Reset to default values
            window.ahpData.criteria = [
                'Pendidikan',
                'Penelitian', 
                'Pengabdian Masyarakat',
                'Kegiatan Penunjang'
            ];
            
            window.ahpData.alternatives = [
                'Dosen A',
                'Dosen B', 
                'Dosen C',
                'Dosen D',
                'Dosen E'
            ];
            
            window.ahpData.setGoal("Menentukan Dosen Terbaik STMIK Primakara");
            
            // Rebuild matrices
            window.ahpData.rebuildCriteriaMatrix();
            window.ahpData.rebuildAlternativeMatrices();
            
            // Update UI
            this.initializeUI();
            this.notifyHierarchyChange();
            
            this.showMessage('Hierarki default berhasil dimuat!', 'success');
            
        } catch (error) {
            this.showMessage('Gagal memuat hierarki default: ' + error.message, 'error');
        }
    }

    /**
     * Export hierarchy configuration
     */
    exportHierarchy() {
        const config = {
            goal: window.ahpData.getGoal(),
            criteria: window.ahpData.getCriteria(),
            alternatives: window.ahpData.getAlternatives(),
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(config, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ahp_hierarchy_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showMessage('Konfigurasi hierarki berhasil diekspor!', 'success');
    }

    /**
     * Import hierarchy configuration
     */
    importHierarchy(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const config = JSON.parse(e.target.result);
                
                // Validate structure
                if (!config.goal || !config.criteria || !config.alternatives) {
                    throw new Error('Format file tidak valid');
                }
                
                // Apply configuration
                window.ahpData.setGoal(config.goal);
                window.ahpData.criteria = [...config.criteria];
                window.ahpData.alternatives = [...config.alternatives];
                
                // Rebuild matrices
                window.ahpData.rebuildCriteriaMatrix();
                window.ahpData.rebuildAlternativeMatrices();
                
                // Update UI
                this.initializeUI();
                this.notifyHierarchyChange();
                
                this.showMessage('Konfigurasi hierarki berhasil diimpor!', 'success');
                
            } catch (error) {
                this.showMessage('Gagal mengimpor konfigurasi: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Create global instance
window.hierarchySetup = new HierarchySetup();
