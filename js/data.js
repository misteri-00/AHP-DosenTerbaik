/**
 * Data module for AHP application
 * Handles CSV data parsing and default data initialization
 */
class AHPData {
    constructor() {
        this.criteriaMatrix = [];
        this.alternativeMatrices = {};
        this.criteriaWeights = [];
        this.alternativeWeights = {};
        this.finalRankings = [];
        this.consistencyResults = {};
        this.goal = "Menentukan Dosen Terbaik STMIK Primakara";
        
        // Dynamic criteria and alternatives
        this.criteria = [
            'Pendidikan',
            'Penelitian', 
            'Pengabdian Masyarakat',
            'Kegiatan Penunjang'
        ];
        
        this.alternatives = [
            'Dosen A',
            'Dosen B', 
            'Dosen C',
            'Dosen D',
            'Dosen E'
        ];
        
        // Random Index (RI) values for consistency calculation
        this.randomIndex = {
            1: 0,
            2: 0,
            3: 0.58,
            4: 0.90,
            5: 1.12,
            6: 1.24,
            7: 1.32,
            8: 1.41,
            9: 1.45,
            10: 1.49,
            11: 1.51,
            12: 1.48,
            13: 1.56,
            14: 1.57,
            15: 1.59
        };
    }

    /**
     * Load default data based on the CSV research results
     */
    loadDefaultData() {
        // Default criteria comparison matrix
        this.criteriaMatrix = [
            [1.000, 3.000, 3.000, 5.000],
            [0.333, 1.000, 1.000, 3.000],
            [0.333, 1.000, 1.000, 3.000],
            [0.200, 0.333, 0.333, 1.000]
        ];

        // Default alternative matrices for each criterion
        this.alternativeMatrices = {
            'Pendidikan': [
                [1.000, 1.000, 1.000, 0.333, 0.333],
                [1.000, 1.000, 1.000, 0.333, 0.333],
                [1.000, 1.000, 1.000, 0.333, 0.333],
                [3.000, 3.000, 3.000, 1.000, 1.000],
                [3.000, 3.000, 3.000, 1.000, 1.000]
            ],
            'Penelitian': [
                [1.000, 1.000, 1.000, 5.000, 3.000],
                [1.000, 1.000, 1.000, 5.000, 3.000],
                [1.000, 1.000, 1.000, 5.000, 3.000],
                [0.200, 0.200, 0.200, 1.000, 0.333],
                [0.333, 0.333, 0.333, 3.000, 1.000]
            ],
            'Pengabdian Masyarakat': [
                [1.000, 1.000, 1.000, 5.000, 5.000],
                [1.000, 1.000, 1.000, 5.000, 5.000],
                [0.333, 0.333, 1.000, 3.000, 3.000],
                [0.200, 0.200, 0.333, 1.000, 1.000],
                [0.200, 0.200, 0.333, 1.000, 1.000]
            ],
            'Kegiatan Penunjang': [
                [1.000, 1.000, 1.000, 5.000, 7.000],
                [1.000, 1.000, 1.000, 5.000, 7.000],
                [1.000, 1.000, 1.000, 5.000, 7.000],
                [0.200, 0.200, 0.200, 1.000, 3.000],
                [0.143, 0.143, 0.143, 0.333, 1.000]
            ]
        };

        // Expected final rankings based on research
        this.expectedRankings = [
            { name: 'Dosen E', score: 0.212612471, rank: 1 },
            { name: 'Dosen A', score: 0.204581431, rank: 2 },
            { name: 'Dosen B', score: 0.204581431, rank: 2 },
            { name: 'Dosen D', score: 0.203965566, rank: 4 },
            { name: 'Dosen C', score: 0.174259100, rank: 5 }
        ];

        // Expected criteria weights
        this.expectedCriteriaWeights = [
            0.519410666, // Pendidikan
            0.200870008, // Penelitian  
            0.200870008, // Pengabdian Masyarakat
            0.078849319  // Kegiatan Penunjang
        ];

        // Expected alternative weights for each criterion
        this.expectedAlternativeWeights = {
            'Pendidikan': [0.111081472, 0.111081472, 0.111081472, 0.333377793, 0.333377793],
            'Penelitian': [0.280525310, 0.280525310, 0.280525310, 0.050937153, 0.107486915],
            'Pengabdian Masyarakat': [0.334248019, 0.334248019, 0.183293025, 0.074105469, 0.074105469],
            'Kegiatan Penunjang': [0.296705249, 0.296705249, 0.296705249, 0.072141050, 0.037743204]
        };

        console.log('Default data loaded successfully');
        return true;
    }

    /**
     * Parse CSV data (for future file upload functionality)
     */
    parseCSVData(csvContent) {
        try {
            // Simple CSV parsing logic would go here
            // For now, we'll use the default data
            return this.loadDefaultData();
        } catch (error) {
            console.error('Error parsing CSV data:', error);
            return false;
        }
    }

    /**
     * Get criteria matrix
     */
    getCriteriaMatrix() {
        return this.criteriaMatrix;
    }

    /**
     * Get alternative matrix for a specific criterion
     */
    getAlternativeMatrix(criterionName) {
        return this.alternativeMatrices[criterionName] || [];
    }

    /**
     * Get all alternative matrices
     */
    getAllAlternativeMatrices() {
        return this.alternativeMatrices;
    }

    /**
     * Get criteria names
     */
    getCriteria() {
        return this.criteria;
    }

    /**
     * Get alternative names
     */
    getAlternatives() {
        return this.alternatives;
    }

    /**
     * Get random index for consistency calculation
     */
    getRandomIndex(n) {
        return this.randomIndex[n] || 0;
    }

    /**
     * Set criteria matrix
     */
    setCriteriaMatrix(matrix) {
        this.criteriaMatrix = matrix;
    }

    /**
     * Set alternative matrix for a criterion
     */
    setAlternativeMatrix(criterionName, matrix) {
        this.alternativeMatrices[criterionName] = matrix;
    }

    /**
     * Reset all data to empty state
     */
    reset() {
        this.criteriaMatrix = [];
        this.alternativeMatrices = {};
        this.criteriaWeights = [];
        this.alternativeWeights = {};
        this.finalRankings = [];
        this.consistencyResults = {};
    }

    /**
     * Create empty matrices with default structure
     */
    initializeEmptyMatrices() {
        // Initialize criteria matrix with 1s on diagonal
        this.criteriaMatrix = [];
        for (let i = 0; i < 4; i++) {
            this.criteriaMatrix[i] = [];
            for (let j = 0; j < 4; j++) {
                this.criteriaMatrix[i][j] = (i === j) ? 1.0 : 1.0;
            }
        }

        // Initialize alternative matrices
        this.criteria.forEach(criterion => {
            this.alternativeMatrices[criterion] = [];
            for (let i = 0; i < 5; i++) {
                this.alternativeMatrices[criterion][i] = [];
                for (let j = 0; j < 5; j++) {
                    this.alternativeMatrices[criterion][i][j] = (i === j) ? 1.0 : 1.0;
                }
            }
        });
    }

    /**
     * Set goal/objective
     */
    setGoal(goal) {
        this.goal = goal;
    }

    /**
     * Get goal/objective
     */
    getGoal() {
        return this.goal;
    }

    /**
     * Add new criterion
     */
    addCriterion(name) {
        if (!name || name.trim() === '') {
            throw new Error('Nama kriteria tidak boleh kosong');
        }
        
        const trimmedName = name.trim();
        if (this.criteria.includes(trimmedName)) {
            throw new Error('Kriteria sudah ada');
        }
        
        this.criteria.push(trimmedName);
        
        // Rebuild matrices with new dimensions
        this.rebuildCriteriaMatrix();
        this.rebuildAlternativeMatrices();
        
        console.log(`Kriteria "${trimmedName}" berhasil ditambahkan`);
        return true;
    }

    /**
     * Remove criterion
     */
    removeCriterion(index) {
        if (index < 0 || index >= this.criteria.length) {
            throw new Error('Index kriteria tidak valid');
        }
        
        if (this.criteria.length <= 2) {
            throw new Error('Minimal harus ada 2 kriteria');
        }
        
        const removedName = this.criteria[index];
        this.criteria.splice(index, 1);
        
        // Remove from alternative matrices
        delete this.alternativeMatrices[removedName];
        
        // Rebuild criteria matrix
        this.rebuildCriteriaMatrix();
        
        console.log(`Kriteria "${removedName}" berhasil dihapus`);
        return true;
    }

    /**
     * Update criterion name
     */
    updateCriterion(index, newName) {
        if (index < 0 || index >= this.criteria.length) {
            throw new Error('Index kriteria tidak valid');
        }
        
        if (!newName || newName.trim() === '') {
            throw new Error('Nama kriteria tidak boleh kosong');
        }
        
        const trimmedName = newName.trim();
        if (this.criteria.includes(trimmedName) && this.criteria[index] !== trimmedName) {
            throw new Error('Kriteria sudah ada');
        }
        
        const oldName = this.criteria[index];
        this.criteria[index] = trimmedName;
        
        // Update alternative matrices key
        if (this.alternativeMatrices[oldName]) {
            this.alternativeMatrices[trimmedName] = this.alternativeMatrices[oldName];
            delete this.alternativeMatrices[oldName];
        }
        
        console.log(`Kriteria "${oldName}" berhasil diubah menjadi "${trimmedName}"`);
        return true;
    }

    /**
     * Add new alternative
     */
    addAlternative(name) {
        if (!name || name.trim() === '') {
            throw new Error('Nama alternatif tidak boleh kosong');
        }
        
        const trimmedName = name.trim();
        if (this.alternatives.includes(trimmedName)) {
            throw new Error('Alternatif sudah ada');
        }
        
        this.alternatives.push(trimmedName);
        
        // Rebuild alternative matrices with new dimensions
        this.rebuildAlternativeMatrices();
        
        console.log(`Alternatif "${trimmedName}" berhasil ditambahkan`);
        return true;
    }

    /**
     * Remove alternative
     */
    removeAlternative(index) {
        if (index < 0 || index >= this.alternatives.length) {
            throw new Error('Index alternatif tidak valid');
        }
        
        if (this.alternatives.length <= 2) {
            throw new Error('Minimal harus ada 2 alternatif');
        }
        
        const removedName = this.alternatives[index];
        this.alternatives.splice(index, 1);
        
        // Rebuild alternative matrices
        this.rebuildAlternativeMatrices();
        
        console.log(`Alternatif "${removedName}" berhasil dihapus`);
        return true;
    }

    /**
     * Update alternative name
     */
    updateAlternative(index, newName) {
        if (index < 0 || index >= this.alternatives.length) {
            throw new Error('Index alternatif tidak valid');
        }
        
        if (!newName || newName.trim() === '') {
            throw new Error('Nama alternatif tidak boleh kosong');
        }
        
        const trimmedName = newName.trim();
        if (this.alternatives.includes(trimmedName) && this.alternatives[index] !== trimmedName) {
            throw new Error('Alternatif sudah ada');
        }
        
        const oldName = this.alternatives[index];
        this.alternatives[index] = trimmedName;
        
        console.log(`Alternatif "${oldName}" berhasil diubah menjadi "${trimmedName}"`);
        return true;
    }

    /**
     * Rebuild criteria matrix when dimensions change
     */
    rebuildCriteriaMatrix() {
        const n = this.criteria.length;
        const oldMatrix = this.criteriaMatrix;
        this.criteriaMatrix = [];
        
        // Initialize new matrix
        for (let i = 0; i < n; i++) {
            this.criteriaMatrix[i] = [];
            for (let j = 0; j < n; j++) {
                if (i === j) {
                    this.criteriaMatrix[i][j] = 1.0;
                } else if (oldMatrix[i] && oldMatrix[i][j] !== undefined) {
                    // Copy existing values if available
                    this.criteriaMatrix[i][j] = oldMatrix[i][j];
                } else if (oldMatrix[j] && oldMatrix[j][i] !== undefined) {
                    // Use reciprocal if available
                    this.criteriaMatrix[i][j] = 1.0 / oldMatrix[j][i];
                } else {
                    // Default value
                    this.criteriaMatrix[i][j] = 1.0;
                }
            }
        }
    }

    /**
     * Rebuild alternative matrices when dimensions change
     */
    rebuildAlternativeMatrices() {
        const n = this.alternatives.length;
        
        // Initialize matrices for all criteria
        this.criteria.forEach(criterion => {
            const oldMatrix = this.alternativeMatrices[criterion];
            this.alternativeMatrices[criterion] = [];
            
            for (let i = 0; i < n; i++) {
                this.alternativeMatrices[criterion][i] = [];
                for (let j = 0; j < n; j++) {
                    if (i === j) {
                        this.alternativeMatrices[criterion][i][j] = 1.0;
                    } else if (oldMatrix && oldMatrix[i] && oldMatrix[i][j] !== undefined) {
                        // Copy existing values if available
                        this.alternativeMatrices[criterion][i][j] = oldMatrix[i][j];
                    } else if (oldMatrix && oldMatrix[j] && oldMatrix[j][i] !== undefined) {
                        // Use reciprocal if available
                        this.alternativeMatrices[criterion][i][j] = 1.0 / oldMatrix[j][i];
                    } else {
                        // Default value
                        this.alternativeMatrices[criterion][i][j] = 1.0;
                    }
                }
            }
        });
    }

    /**
     * Validate hierarchy structure
     */
    validateHierarchy() {
        const errors = [];
        
        if (!this.goal || this.goal.trim() === '') {
            errors.push('Tujuan keputusan harus diisi');
        }
        
        if (this.criteria.length < 2) {
            errors.push('Minimal harus ada 2 kriteria');
        }
        
        if (this.alternatives.length < 2) {
            errors.push('Minimal harus ada 2 alternatif');
        }
        
        if (this.criteria.length > 15) {
            errors.push('Maksimal 15 kriteria untuk menjaga konsistensi perhitungan');
        }
        
        if (this.alternatives.length > 15) {
            errors.push('Maksimal 15 alternatif untuk menjaga konsistensi perhitungan');
        }
        
        // Check for duplicate names
        const criteriaSet = new Set(this.criteria);
        if (criteriaSet.size !== this.criteria.length) {
            errors.push('Nama kriteria tidak boleh duplikat');
        }
        
        const alternativeSet = new Set(this.alternatives);
        if (alternativeSet.size !== this.alternatives.length) {
            errors.push('Nama alternatif tidak boleh duplikat');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Get hierarchy summary
     */
    getHierarchySummary() {
        return {
            goal: this.goal,
            criteriaCount: this.criteria.length,
            alternativeCount: this.alternatives.length,
            totalMatrices: 1 + this.criteria.length, // 1 criteria matrix + n alternative matrices
            totalComparisons: (this.criteria.length * (this.criteria.length - 1)) / 2 + 
                             this.criteria.length * (this.alternatives.length * (this.alternatives.length - 1)) / 2
        };
    }
}

// Create global instance
window.ahpData = new AHPData();
