/**
 * AHP calculation module
 * Handles all AHP computations including priority calculations and final rankings
 */
class AHPCalculator {
    constructor() {
        this.criteriaWeights = [];
        this.alternativeWeights = {};
        this.finalScores = [];
        this.consistencyResults = {};
    }

    /**
     * Calculate AHP priorities for criteria matrix
     */
    calculateCriteriaPriorities() {
        const matrix = window.ahpData.getCriteriaMatrix();
        if (!matrix || matrix.length === 0) {
            console.error('Criteria matrix is empty');
            return false;
        }

        try {
            // Normalize matrix and get priorities
            const result = MatrixUtils.normalizeMatrix(matrix);
            this.criteriaWeights = result.priorities;
            
            // Calculate consistency
            const consistency = MatrixUtils.calculateConsistency(matrix, this.criteriaWeights);
            this.consistencyResults.criteria = consistency;
            
            // Display results
            MatrixUtils.displayConsistencyResults(consistency, 'criteria-consistency');
            
            console.log('Criteria priorities calculated:', this.criteriaWeights);
            console.log('Criteria consistency:', consistency);
            
            return true;
        } catch (error) {
            console.error('Error calculating criteria priorities:', error);
            return false;
        }
    }

    /**
     * Calculate AHP priorities for all alternative matrices
     */
    calculateAlternativePriorities() {
        const criteria = window.ahpData.getCriteria();
        this.alternativeWeights = {};
        
        criteria.forEach(criterion => {
            const matrix = window.ahpData.getAlternativeMatrix(criterion);
            if (!matrix || matrix.length === 0) {
                console.error(`Alternative matrix for ${criterion} is empty`);
                return;
            }

            try {
                // Normalize matrix and get priorities
                const result = MatrixUtils.normalizeMatrix(matrix);
                this.alternativeWeights[criterion] = result.priorities;
                
                // Calculate consistency
                const consistency = MatrixUtils.calculateConsistency(matrix, result.priorities);
                this.consistencyResults[criterion] = consistency;
                
                // Display results
                const containerId = `consistency-${criterion.toLowerCase().replace(/\s+/g, '-')}`;
                MatrixUtils.displayConsistencyResults(consistency, containerId);
                
                console.log(`${criterion} priorities:`, result.priorities);
                console.log(`${criterion} consistency:`, consistency);
                
            } catch (error) {
                console.error(`Error calculating ${criterion} priorities:`, error);
            }
        });
        
        return Object.keys(this.alternativeWeights).length === criteria.length;
    }

    /**
     * Calculate final scores and rankings
     */
    calculateFinalRankings() {
        if (this.criteriaWeights.length === 0 || Object.keys(this.alternativeWeights).length === 0) {
            console.error('Cannot calculate final rankings: missing weights');
            return false;
        }

        const alternatives = window.ahpData.getAlternatives();
        const criteria = window.ahpData.getCriteria();
        
        this.finalScores = alternatives.map((alternative, altIndex) => {
            let totalScore = 0;
            
            criteria.forEach((criterion, critIndex) => {
                const criterionWeight = this.criteriaWeights[critIndex];
                const alternativeWeight = this.alternativeWeights[criterion][altIndex];
                totalScore += criterionWeight * alternativeWeight;
            });
            
            return {
                name: alternative,
                score: totalScore,
                index: altIndex
            };
        });

        // Sort by score (descending)
        this.finalScores.sort((a, b) => b.score - a.score);
        
        // Add ranks
        this.finalScores.forEach((item, index) => {
            item.rank = index + 1;
        });

        console.log('Final rankings calculated:', this.finalScores);
        return true;
    }

    /**
     * Perform complete AHP calculation
     */
    performFullCalculation() {
        console.log('Starting AHP calculation...');
        
        // Step 1: Calculate criteria priorities
        const criteriaSuccess = this.calculateCriteriaPriorities();
        if (!criteriaSuccess) {
            alert('Gagal menghitung prioritas kriteria. Periksa matriks kriteria.');
            return false;
        }

        // Step 2: Calculate alternative priorities
        const alternativesSuccess = this.calculateAlternativePriorities();
        if (!alternativesSuccess) {
            alert('Gagal menghitung prioritas alternatif. Periksa matriks alternatif.');
            return false;
        }

        // Step 3: Calculate final rankings
        const rankingsSuccess = this.calculateFinalRankings();
        if (!rankingsSuccess) {
            alert('Gagal menghitung ranking akhir.');
            return false;
        }

        // Step 4: Display results
        this.displayResults();
        
        console.log('AHP calculation completed successfully');
        return true;
    }

    /**
     * Display all results in the results tab
     */
    displayResults() {
        this.displayCriteriaWeights();
        this.displayFinalRankings();
        this.displayVisualization();
    }

    /**
     * Display criteria weights table
     */
    displayCriteriaWeights() {
        const container = document.getElementById('criteria-weights');
        if (!container) return;

        const criteria = window.ahpData.getCriteria();
        
        let html = `
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-blue-100">
                        <th class="border border-gray-300 p-3 text-left font-semibold">Kriteria</th>
                        <th class="border border-gray-300 p-3 text-center font-semibold">Bobot Prioritas</th>
                        <th class="border border-gray-300 p-3 text-center font-semibold">Persentase</th>
                        <th class="border border-gray-300 p-3 text-center font-semibold">Ranking</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Create array with weights for sorting
        const weightedCriteria = criteria.map((criterion, index) => ({
            name: criterion,
            weight: this.criteriaWeights[index],
            index: index
        }));

        // Sort by weight (descending)
        weightedCriteria.sort((a, b) => b.weight - a.weight);

        // Add rank
        weightedCriteria.forEach((item, index) => {
            item.rank = index + 1;
        });

        // Sort back to original order for display
        weightedCriteria.sort((a, b) => a.index - b.index);

        weightedCriteria.forEach((item, index) => {
            const percentage = (item.weight * 100).toFixed(1);
            const rankClass = item.rank === 1 ? 'bg-yellow-50' : item.rank === 2 ? 'bg-gray-50' : '';
            
            html += `
                <tr class="${rankClass}">
                    <td class="border border-gray-300 p-3 font-medium">K${index + 1} - ${item.name}</td>
                    <td class="border border-gray-300 p-3 text-center font-mono">${item.weight.toFixed(6)}</td>
                    <td class="border border-gray-300 p-3 text-center">${percentage}%</td>
                    <td class="border border-gray-300 p-3 text-center font-bold">${item.rank}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        container.innerHTML = html;
    }

    /**
     * Display final rankings table
     */
    displayFinalRankings() {
        const container = document.getElementById('final-rankings');
        if (!container) return;

        let html = `
            <div class="space-y-4">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-green-100">
                            <th class="border border-gray-300 p-3 text-center font-semibold">Ranking</th>
                            <th class="border border-gray-300 p-3 text-left font-semibold">Nama Dosen</th>
                            <th class="border border-gray-300 p-3 text-center font-semibold">Skor Total</th>
                            <th class="border border-gray-300 p-3 text-center font-semibold">Persentase</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        this.finalScores.forEach(item => {
            const percentage = (item.score * 100).toFixed(1);
            let rankClass = '';
            
            if (item.rank === 1) rankClass = 'bg-yellow-100 border-yellow-300';
            else if (item.rank === 2) rankClass = 'bg-gray-100 border-gray-300';
            else if (item.rank === 3) rankClass = 'bg-amber-100 border-amber-300';
            
            html += `
                <tr class="${rankClass}">
                    <td class="border border-gray-300 p-3 text-center font-bold text-lg">${item.rank}</td>
                    <td class="border border-gray-300 p-3 font-medium">${item.name}</td>
                    <td class="border border-gray-300 p-3 text-center font-mono">${item.score.toFixed(6)}</td>
                    <td class="border border-gray-300 p-3 text-center">${percentage}%</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
                
                <!-- Detailed breakdown -->
                <div class="mt-6">
                    <h3 class="text-lg font-semibold mb-4">Rincian Perhitungan per Kriteria</h3>
                    ${this.generateDetailedBreakdown()}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Generate detailed breakdown table
     */
    generateDetailedBreakdown() {
        const criteria = window.ahpData.getCriteria();
        const alternatives = window.ahpData.getAlternatives();
        
        let html = `
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr class="bg-blue-50">
                            <th class="border border-gray-300 p-2 text-left font-semibold">Dosen</th>
        `;
        
        criteria.forEach(criterion => {
            html += `<th class="border border-gray-300 p-2 text-center font-semibold">${criterion}</th>`;
        });
        
        html += `
                            <th class="border border-gray-300 p-2 text-center font-semibold bg-green-50">Total Skor</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        alternatives.forEach((alternative, altIndex) => {
            html += `<tr><td class="border border-gray-300 p-2 font-medium">${alternative}</td>`;
            
            let totalScore = 0;
            criteria.forEach((criterion, critIndex) => {
                const criterionWeight = this.criteriaWeights[critIndex];
                const alternativeWeight = this.alternativeWeights[criterion][altIndex];
                const weightedScore = criterionWeight * alternativeWeight;
                totalScore += weightedScore;
                
                html += `
                    <td class="border border-gray-300 p-2 text-center">
                        <div class="text-xs text-gray-600">${alternativeWeight.toFixed(4)}</div>
                        <div class="font-medium">${weightedScore.toFixed(4)}</div>
                    </td>
                `;
            });
            
            html += `<td class="border border-gray-300 p-2 text-center font-bold bg-green-50">${totalScore.toFixed(6)}</td></tr>`;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        return html;
    }

    /**
     * Display visualization
     */
    displayVisualization() {
        const container = document.getElementById('visualization-container');
        if (!container) return;

        // Create simple bar chart using CSS
        let html = `
            <div class="w-full max-w-4xl space-y-6">
                <!-- Rankings Chart -->
                <div>
                    <h3 class="text-lg font-semibold mb-4 text-center">Ranking Dosen Berdasarkan Skor AHP</h3>
                    <div class="space-y-3">
        `;

        const maxScore = Math.max(...this.finalScores.map(item => item.score));
        
        this.finalScores.forEach(item => {
            const percentage = (item.score / maxScore) * 100;
            let colorClass = 'bg-blue-500';
            
            if (item.rank === 1) colorClass = 'bg-yellow-500';
            else if (item.rank === 2) colorClass = 'bg-gray-500';
            else if (item.rank === 3) colorClass = 'bg-amber-600';
            
            html += `
                <div class="flex items-center space-x-4">
                    <div class="w-20 text-sm font-medium">${item.name}</div>
                    <div class="flex-1 bg-gray-200 rounded-full h-8 relative">
                        <div class="${colorClass} h-8 rounded-full flex items-center justify-end pr-2 text-white text-sm font-medium transition-all duration-500"
                             style="width: ${percentage}%">
                            ${item.score.toFixed(4)}
                        </div>
                    </div>
                    <div class="w-12 text-center text-lg font-bold">#${item.rank}</div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
                
                <!-- Criteria Weights Chart -->
                <div>
                    <h3 class="text-lg font-semibold mb-4 text-center">Bobot Kriteria</h3>
                    <div class="space-y-3">
        `;

        const criteria = window.ahpData.getCriteria();
        const maxWeight = Math.max(...this.criteriaWeights);
        
        criteria.forEach((criterion, index) => {
            const weight = this.criteriaWeights[index];
            const percentage = (weight / maxWeight) * 100;
            const displayPercentage = (weight * 100).toFixed(1);
            
            html += `
                <div class="flex items-center space-x-4">
                    <div class="w-32 text-sm font-medium">${criterion}</div>
                    <div class="flex-1 bg-gray-200 rounded-full h-6 relative">
                        <div class="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium transition-all duration-500"
                             style="width: ${percentage}%">
                            ${displayPercentage}%
                        </div>
                    </div>
                    <div class="w-16 text-center text-sm font-mono">${weight.toFixed(3)}</div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Get current results
     */
    getResults() {
        return {
            criteriaWeights: this.criteriaWeights,
            alternativeWeights: this.alternativeWeights,
            finalScores: this.finalScores,
            consistencyResults: this.consistencyResults
        };
    }

    /**
     * Reset calculator
     */
    reset() {
        this.criteriaWeights = [];
        this.alternativeWeights = {};
        this.finalScores = [];
        this.consistencyResults = {};
    }
}

// Create global instance
window.ahpCalculator = new AHPCalculator();
