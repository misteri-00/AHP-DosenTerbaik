/**
 * Matrix utility module for AHP calculations
 * Handles matrix operations and UI interactions
 */
class MatrixUtils {
    /**
     * Create matrix input table for criteria
     */
    static createCriteriaMatrixTable(matrix, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const criteria = window.ahpData.getCriteria();
        let html = `
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 p-3 text-left font-semibold">Kriteria</th>
        `;

        // Add header columns
        criteria.forEach((criterion, index) => {
            html += `<th class="border border-gray-300 p-3 text-center font-semibold">K${index + 1} (${criterion})</th>`;
        });

        html += `
                    </tr>
                </thead>
                <tbody>
        `;

        // Add matrix rows
        criteria.forEach((criterion, i) => {
            html += `
                <tr>
                    <td class="border border-gray-300 p-3 font-semibold bg-gray-50">K${i + 1}</td>
            `;

            criteria.forEach((_, j) => {
                const value = matrix[i] ? matrix[i][j] : (i === j ? 1 : 1);
                const isReadonly = i >= j;
                const readonlyClass = isReadonly ? 'bg-gray-100' : '';
                
                html += `
                    <td class="border border-gray-300 p-1">
                        <input type="number" 
                               class="matrix-input w-full p-2 text-center border rounded ${readonlyClass}" 
                               data-row="${i}" 
                               data-col="${j}" 
                               value="${value.toFixed(3)}" 
                               ${isReadonly ? 'readonly' : 'min="0.001" max="9" step="0.001"'}>
                    </td>
                `;
            });

            html += '</tr>';
        });

        html += `
                </tbody>
            </table>
        `;

        container.innerHTML = html;

        // Add event listeners for matrix inputs
        this.addMatrixEventListeners('criteria');
    }

    /**
     * Create matrix input table for alternatives
     */
    static createAlternativeMatrixTable(matrix, criterionName, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const alternatives = window.ahpData.getAlternatives();
        let html = `
            <div class="alternative-section ${this.getCriterionClass(criterionName)}">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    Matriks Perbandingan Alternatif - ${criterionName}
                </h3>
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="border border-gray-300 p-3 text-left font-semibold">Alternatif</th>
        `;

        // Add header columns
        alternatives.forEach((alternative, index) => {
            html += `<th class="border border-gray-300 p-3 text-center font-semibold">A${index + 1} (${alternative})</th>`;
        });

        html += `
                            </tr>
                        </thead>
                        <tbody>
        `;

        // Add matrix rows
        alternatives.forEach((alternative, i) => {
            html += `
                <tr>
                    <td class="border border-gray-300 p-3 font-semibold bg-gray-50">A${i + 1}</td>
            `;

            alternatives.forEach((_, j) => {
                const value = matrix[i] ? matrix[i][j] : (i === j ? 1 : 1);
                const isReadonly = i >= j;
                const readonlyClass = isReadonly ? 'bg-gray-100' : '';
                
                html += `
                    <td class="border border-gray-300 p-1">
                        <input type="number" 
                               class="matrix-input w-full p-2 text-center border rounded ${readonlyClass}" 
                               data-criterion="${criterionName}"
                               data-row="${i}" 
                               data-col="${j}" 
                               value="${value.toFixed(3)}" 
                               ${isReadonly ? 'readonly' : 'min="0.001" max="9" step="0.001"'}>
                    </td>
                `;
            });

            html += '</tr>';
        });

        html += `
                        </tbody>
                    </table>
                </div>
                
                <!-- Consistency Results -->
                <div id="consistency-${criterionName.toLowerCase().replace(/\s+/g, '-')}" 
                     class="mt-4 p-4 border rounded-lg bg-gray-50 hidden">
                    <h4 class="font-semibold text-gray-800 mb-2">Hasil Konsistensi ${criterionName}</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>λ Max: <span class="lambda font-mono"></span></div>
                        <div>CI: <span class="ci font-mono"></span></div>
                        <div>CR: <span class="cr font-mono"></span></div>
                    </div>
                    <div class="consistency-status mt-2 text-sm font-medium"></div>
                </div>
            </div>
        `;

        container.innerHTML += html;

        // Add event listeners for this matrix
        this.addMatrixEventListeners(criterionName);
    }

    /**
     * Get CSS class for criterion styling
     */
    static getCriterionClass(criterionName) {
        const classMap = {
            'Pendidikan': 'education',
            'Penelitian': 'research',
            'Pengabdian Masyarakat': 'service',
            'Kegiatan Penunjang': 'support'
        };
        return classMap[criterionName] || '';
    }

    /**
     * Add event listeners to matrix inputs
     */
    static addMatrixEventListeners(matrixType) {
        const selector = matrixType === 'criteria' 
            ? 'input[data-row][data-col]:not([data-criterion])' 
            : `input[data-criterion="${matrixType}"]`;
            
        const inputs = document.querySelectorAll(selector);
        
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.handleMatrixInput(e, matrixType);
            });
        });
    }

    /**
     * Handle matrix input changes and update reciprocal values
     */
    static handleMatrixInput(event, matrixType) {
        const input = event.target;
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const value = parseFloat(input.value) || 1;

        // Don't process diagonal elements or lower triangle
        if (row >= col) return;

        // Find the reciprocal input
        const reciprocalSelector = matrixType === 'criteria'
            ? `input[data-row="${col}"][data-col="${row}"]:not([data-criterion])`
            : `input[data-criterion="${matrixType}"][data-row="${col}"][data-col="${row}"]`;
            
        const reciprocalInput = document.querySelector(reciprocalSelector);
        
        if (reciprocalInput) {
            reciprocalInput.value = (1 / value).toFixed(3);
        }

        // Update the corresponding matrix in data
        if (matrixType === 'criteria') {
            const matrix = window.ahpData.getCriteriaMatrix();
            if (matrix[row]) {
                matrix[row][col] = value;
                matrix[col][row] = 1 / value;
            }
        } else {
            const matrix = window.ahpData.getAlternativeMatrix(matrixType);
            if (matrix[row]) {
                matrix[row][col] = value;
                matrix[col][row] = 1 / value;
            }
        }
    }

    /**
     * Update matrix inputs from data
     */
    static updateMatrixInputs(matrixType) {
        if (matrixType === 'criteria') {
            const matrix = window.ahpData.getCriteriaMatrix();
            const inputs = document.querySelectorAll('input[data-row][data-col]:not([data-criterion])');
            
            inputs.forEach(input => {
                const row = parseInt(input.dataset.row);
                const col = parseInt(input.dataset.col);
                if (matrix[row] && matrix[row][col] !== undefined) {
                    input.value = matrix[row][col].toFixed(3);
                }
            });
        } else {
            const matrix = window.ahpData.getAlternativeMatrix(matrixType);
            const inputs = document.querySelectorAll(`input[data-criterion="${matrixType}"]`);
            
            inputs.forEach(input => {
                const row = parseInt(input.dataset.row);
                const col = parseInt(input.dataset.col);
                if (matrix[row] && matrix[row][col] !== undefined) {
                    input.value = matrix[row][col].toFixed(3);
                }
            });
        }
    }

    /**
     * Create all alternative matrix tables
     */
    static createAllAlternativeMatrices() {
        const container = document.getElementById('alternative-matrices-container');
        if (!container) return;

        container.innerHTML = '';
        
        const criteria = window.ahpData.getCriteria();
        criteria.forEach(criterion => {
            const matrix = window.ahpData.getAlternativeMatrix(criterion);
            this.createAlternativeMatrixTable(matrix, criterion, 'alternative-matrices-container');
        });
    }

    /**
     * Normalize a matrix using geometric mean method
     */
    static normalizeMatrix(matrix) {
        const n = matrix.length;
        const normalized = [];
        const priorities = [];
        
        // Calculate column sums
        const columnSums = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                columnSums[j] += matrix[i][j];
            }
        }
        
        // Normalize each element
        for (let i = 0; i < n; i++) {
            normalized[i] = [];
            let rowSum = 0;
            for (let j = 0; j < n; j++) {
                normalized[i][j] = matrix[i][j] / columnSums[j];
                rowSum += normalized[i][j];
            }
            priorities[i] = rowSum / n;
        }
        
        return { normalized, priorities };
    }

    /**
     * Calculate lambda max for consistency check
     */
    static calculateLambdaMax(matrix, priorities) {
        const n = matrix.length;
        let lambdaMax = 0;
        
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                sum += matrix[i][j] * priorities[j];
            }
            lambdaMax += sum / priorities[i];
        }
        
        return lambdaMax / n;
    }

    /**
     * Calculate consistency index and ratio
     */
    static calculateConsistency(matrix, priorities) {
        const n = matrix.length;
        const lambdaMax = this.calculateLambdaMax(matrix, priorities);
        const ci = (lambdaMax - n) / (n - 1);
        const ri = window.ahpData.getRandomIndex(n);
        const cr = ri === 0 ? 0 : ci / ri;
        
        return { lambdaMax, ci, cr };
    }

    /**
     * Display consistency results
     */
    static displayConsistencyResults(consistency, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.classList.remove('hidden');
        
        const lambdaSpan = container.querySelector('.lambda') || container.querySelector('#' + containerId.replace('consistency', '') + '-lambda');
        const ciSpan = container.querySelector('.ci') || container.querySelector('#' + containerId.replace('consistency', '') + '-ci');
        const crSpan = container.querySelector('.cr') || container.querySelector('#' + containerId.replace('consistency', '') + '-cr');
        const statusDiv = container.querySelector('.consistency-status') || container.querySelector('#' + containerId.replace('consistency', '') + '-consistency-status');
        
        if (lambdaSpan) lambdaSpan.textContent = consistency.lambdaMax.toFixed(6);
        if (ciSpan) ciSpan.textContent = consistency.ci.toFixed(6);
        if (crSpan) crSpan.textContent = consistency.cr.toFixed(6);
        
        if (statusDiv) {
            statusDiv.className = 'mt-2 text-sm font-medium ';
            if (consistency.cr < 0.1) {
                statusDiv.className += 'consistency-good';
                statusDiv.textContent = '✓ Konsisten (CR < 0.1)';
            } else if (consistency.cr < 0.2) {
                statusDiv.className += 'consistency-warning';
                statusDiv.textContent = '⚠ Cukup Konsisten (CR < 0.2)';
            } else {
                statusDiv.className += 'consistency-poor';
                statusDiv.textContent = '✗ Tidak Konsisten (CR ≥ 0.2)';
            }
        }
    }
}

// Make available globally
window.MatrixUtils = MatrixUtils;
