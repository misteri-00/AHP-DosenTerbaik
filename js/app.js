/**
 * Main application module
 * Handles UI interactions, tab switching, and coordinates other modules
 */
class AHPApp {
    constructor() {
        this.currentTab = 'criteria';
        this.isDataLoaded = false;
        this.isCalculated = false;
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        console.log('Initializing AHP Application...');
        
        // Initialize data
        window.ahpData.initializeEmptyMatrices();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize UI
        this.initializeUI();
        
        console.log('AHP Application initialized successfully');
    }    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Tab navigation
        document.getElementById('tab-setup').addEventListener('click', () => this.switchTab('setup'));
        document.getElementById('tab-criteria').addEventListener('click', () => this.switchTab('criteria'));
        document.getElementById('tab-alternatives').addEventListener('click', () => this.switchTab('alternatives'));
        document.getElementById('tab-results').addEventListener('click', () => this.switchTab('results'));
        
        // Control buttons
        document.getElementById('load-default-data').addEventListener('click', () => this.loadDefaultData());
        document.getElementById('calculate-ahp').addEventListener('click', () => this.calculateAHP());
        document.getElementById('reset-matrices').addEventListener('click', () => this.resetData());
        document.getElementById('validate-hierarchy').addEventListener('click', () => this.validateHierarchy());
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key) {
                    case '0':
                        e.preventDefault();
                        this.switchTab('setup');
                        break;
                    case '1':
                        e.preventDefault();
                        this.switchTab('criteria');
                        break;
                    case '2':
                        e.preventDefault();
                        this.switchTab('alternatives');
                        break;
                    case '3':
                        e.preventDefault();
                        this.switchTab('results');
                        break;
                    case 'Enter':
                        e.preventDefault();
                        this.calculateAHP();
                        break;
                }
            }
        });
    }

    /**
     * Initialize UI components
     */
    initializeUI() {
        // Create initial empty matrices
        this.updateCriteriaMatrix();
        this.updateAlternativeMatrices();
          // Show initial tab
        this.switchTab('setup');
        
        // Add loading states
        this.addLoadingStates();
    }

    /**
     * Switch between tabs
     */
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`tab-${tabName}`).classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`${tabName}-tab`).classList.remove('hidden');
        
        this.currentTab = tabName;
          // Update UI based on current tab
        if (tabName === 'setup') {
            if (window.hierarchySetup) {
                window.hierarchySetup.initializeUI();
            }
        } else if (tabName === 'alternatives') {
            this.updateAlternativeMatrices();
        } else if (tabName === 'results' && !this.isCalculated) {
            this.showEmptyResults();
        }
    }

    /**
     * Load default data from CSV
     */
    loadDefaultData() {
        console.log('Loading default data...');
        
        const button = document.getElementById('load-default-data');
        const originalText = button.textContent;
        
        // Show loading state
        button.innerHTML = '<span class="spinner"></span> Memuat Data...';
        button.disabled = true;
          // Simulate loading delay for better UX
        setTimeout(() => {
            try {
                // Load default data
                window.ahpData.loadDefaultData();
                
                // Update hierarchy setup if available
                if (window.hierarchySetup) {
                    window.hierarchySetup.loadDefaultHierarchy();
                }
                
                // Update UI matrices
                this.updateCriteriaMatrix();
                this.updateAlternativeMatrices();
                
                this.isDataLoaded = true;
                this.isCalculated = false;
                
                // Show success message
                this.showNotification('Data default berhasil dimuat!', 'success');
                
                console.log('Default data loaded successfully');
                
            } catch (error) {
                console.error('Error loading default data:', error);
                this.showNotification('Gagal memuat data default!', 'error');
            } finally {
                // Reset button state
                button.textContent = originalText;
                button.disabled = false;
            }
        }, 1000);
    }

    /**
     * Calculate AHP results
     */
    calculateAHP() {
        console.log('Starting AHP calculation...');
        
        const button = document.getElementById('calculate-ahp');
        const originalText = button.textContent;
        
        // Show loading state
        button.innerHTML = '<span class="spinner"></span> Menghitung...';
        button.disabled = true;
        
        // Simulate calculation delay for better UX
        setTimeout(() => {
            try {
                // Perform AHP calculation
                const success = window.ahpCalculator.performFullCalculation();
                
                if (success) {
                    this.isCalculated = true;
                    this.showNotification('Perhitungan AHP berhasil!', 'success');
                    
                    // Switch to results tab
                    this.switchTab('results');
                } else {
                    this.showNotification('Gagal melakukan perhitungan AHP!', 'error');
                }
                
            } catch (error) {
                console.error('Error calculating AHP:', error);
                this.showNotification('Terjadi kesalahan saat perhitungan!', 'error');
            } finally {
                // Reset button state
                button.textContent = originalText;
                button.disabled = false;
            }
        }, 1500);
    }

    /**
     * Reset all data
     */
    resetData() {
        if (!confirm('Apakah Anda yakin ingin mereset semua data? Semua input akan hilang.')) {
            return;
        }
        
        console.log('Resetting all data...');
        
        // Reset data
        window.ahpData.reset();
        window.ahpData.initializeEmptyMatrices();
        window.ahpCalculator.reset();
        
        // Reset UI
        this.updateCriteriaMatrix();
        this.updateAlternativeMatrices();
        this.clearResults();
        
        // Reset flags
        this.isDataLoaded = false;
        this.isCalculated = false;
          // Switch to criteria tab
        this.switchTab('setup');
        
        this.showNotification('Data berhasil direset!', 'info');
    }

    /**
     * Update criteria matrix UI
     */
    updateCriteriaMatrix() {
        const matrix = window.ahpData.getCriteriaMatrix();
        MatrixUtils.createCriteriaMatrixTable(matrix, 'criteria-matrix');
    }

    /**
     * Update alternative matrices UI
     */
    updateAlternativeMatrices() {
        MatrixUtils.createAllAlternativeMatrices();
    }

    /**
     * Clear results display
     */
    clearResults() {
        const containers = ['criteria-weights', 'final-rankings', 'visualization-container'];
        containers.forEach(id => {
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = '<div class="text-center text-gray-500 py-8">Silakan lakukan perhitungan AHP terlebih dahulu</div>';
            }
        });
        
        // Hide consistency results
        document.querySelectorAll('[id^="consistency-"]').forEach(el => {
            el.classList.add('hidden');
        });
    }

    /**
     * Show empty results message
     */
    showEmptyResults() {
        if (!this.isCalculated) {
            this.clearResults();
        }
    }

    /**
     * Show notification message
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        // Set type-specific styling
        switch(type) {
            case 'success':
                notification.className += ' bg-green-500 text-white';
                break;
            case 'error':
                notification.className += ' bg-red-500 text-white';
                break;
            case 'warning':
                notification.className += ' bg-yellow-500 text-white';
                break;
            default:
                notification.className += ' bg-blue-500 text-white';
        }
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    /**
     * Add loading states to buttons
     */
    addLoadingStates() {
        // Add CSS for spinner if not already present
        if (!document.getElementById('spinner-style')) {
            const style = document.createElement('style');
            style.id = 'spinner-style';
            style.textContent = `
                .spinner {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid #ffffff;
                    border-radius: 50%;
                    border-top-color: transparent;
                    animation: spin 1s ease-in-out infinite;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);        }
    }

    /**
     * Validate hierarchy structure
     */
    validateHierarchy() {
        if (window.hierarchySetup) {
            return window.hierarchySetup.validateHierarchy();
        } else {
            const validation = window.ahpData.validateHierarchy();
            if (validation.isValid) {
                this.showNotification('Hierarki valid dan siap untuk perhitungan AHP!', 'success');
            } else {
                const errorMessage = 'Hierarki tidak valid:\n' + validation.errors.join('\n');
                this.showNotification(errorMessage, 'error');
            }
            return validation.isValid;
        }
    }

    /**
     * Export results as CSV
     */
    exportResults() {
        if (!this.isCalculated) {
            this.showNotification('Belum ada hasil untuk diekspor!', 'warning');
            return;
        }
        
        try {
            const results = window.ahpCalculator.getResults();
            const csvContent = this.generateCSVContent(results);
            
            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `ahp_results_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showNotification('Hasil berhasil diekspor!', 'success');
            
        } catch (error) {
            console.error('Error exporting results:', error);
            this.showNotification('Gagal mengekspor hasil!', 'error');
        }
    }

    /**
     * Generate CSV content from results
     */
    generateCSVContent(results) {
        let csv = 'AHP Analysis Results\n\n';
        
        // Criteria weights
        csv += 'Criteria Weights\n';
        csv += 'Criterion,Weight,Percentage\n';
        const criteria = window.ahpData.getCriteria();
        results.criteriaWeights.forEach((weight, index) => {
            csv += `"${criteria[index]}",${weight},${(weight * 100).toFixed(2)}%\n`;
        });
        
        csv += '\nFinal Rankings\n';
        csv += 'Rank,Alternative,Score,Percentage\n';
        results.finalScores.forEach(item => {
            csv += `${item.rank},"${item.name}",${item.score},${(item.score * 100).toFixed(2)}%\n`;
        });
        
        csv += '\nConsistency Results\n';
        csv += 'Matrix,Lambda Max,CI,CR,Status\n';
        Object.entries(results.consistencyResults).forEach(([name, consistency]) => {
            const status = consistency.cr < 0.1 ? 'Consistent' : consistency.cr < 0.2 ? 'Acceptable' : 'Inconsistent';
            csv += `"${name}",${consistency.lambdaMax},${consistency.ci},${consistency.cr},"${status}"\n`;
        });
        
        return csv;
    }

    /**
     * Get application status
     */
    getStatus() {
        return {
            currentTab: this.currentTab,
            isDataLoaded: this.isDataLoaded,
            isCalculated: this.isCalculated,
            version: '1.0.0'
        };
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ahpApp = new AHPApp();
    
    // Add export button to results tab
    const exportButton = `
        <button onclick="window.ahpApp.exportResults()" 
                class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Ekspor Hasil CSV
        </button>
    `;
    
    // Add export functionality to control panel
    setTimeout(() => {
        const controlPanel = document.querySelector('#results-tab .space-y-6');
        if (controlPanel) {
            const exportDiv = document.createElement('div');
            exportDiv.className = 'flex justify-center mt-6';
            exportDiv.innerHTML = exportButton;
            controlPanel.appendChild(exportDiv);
        }
    }, 1000);
});

// Add keyboard shortcut help
document.addEventListener('DOMContentLoaded', () => {
    const helpButton = `
        <button onclick="showKeyboardShortcuts()" 
                class="fixed bottom-4 right-4 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors z-40">
            ?
        </button>
    `;
    document.body.insertAdjacentHTML('beforeend', helpButton);
});

// Show keyboard shortcuts
function showKeyboardShortcuts() {
    const modal = `
        <div id="shortcuts-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 class="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span>Setup Hierarki:</span>
                        <kbd class="bg-gray-100 px-2 py-1 rounded">Ctrl + 0</kbd>
                    </div>
                    <div class="flex justify-between">
                        <span>Tab Kriteria:</span>
                        <kbd class="bg-gray-100 px-2 py-1 rounded">Ctrl + 1</kbd>
                    </div>
                    <div class="flex justify-between">
                        <span>Tab Alternatif:</span>
                        <kbd class="bg-gray-100 px-2 py-1 rounded">Ctrl + 2</kbd>
                    </div>
                    <div class="flex justify-between">
                        <span>Tab Hasil:</span>
                        <kbd class="bg-gray-100 px-2 py-1 rounded">Ctrl + 3</kbd>
                    </div>
                    <div class="flex justify-between">
                        <span>Hitung AHP:</span>
                        <kbd class="bg-gray-100 px-2 py-1 rounded">Ctrl + Enter</kbd>
                    </div>
                </div>
                <button onclick="document.getElementById('shortcuts-modal').remove()" 
                        class="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Tutup
                </button>
            </div>
        </div>    `;
    document.body.insertAdjacentHTML('beforeend', modal);
}
