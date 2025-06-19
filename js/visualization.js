/**
 * Visualization module for AHP results
 * Handles charts and visual representations
 */
class AHPVisualization {
    /**
     * Create pie chart for criteria weights
     */
    static createCriteriaPieChart(containerId, weights, labels) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const total = weights.reduce((sum, weight) => sum + weight, 0);
        const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];
        
        let html = `
            <div class="criteria-pie-chart">
                <h4 class="text-center font-semibold mb-4">Distribusi Bobot Kriteria</h4>
                <div class="flex flex-col items-center space-y-4">
        `;

        // Create simple pie representation using CSS
        let cumulativePercentage = 0;
        
        html += `
            <div class="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-300" style="background: conic-gradient(
        `;

        weights.forEach((weight, index) => {
            const percentage = (weight / total) * 100;
            const endPercentage = cumulativePercentage + percentage;
            
            if (index > 0) html += ', ';
            html += `${colors[index]} ${cumulativePercentage}% ${endPercentage}%`;
            
            cumulativePercentage = endPercentage;
        });

        html += ');">'; // Close conic-gradient
        
        // Add center circle
        html += `
                <div class="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                    <span class="text-sm font-bold text-gray-700">Kriteria</span>
                </div>
            </div>
        `;

        // Add legend
        html += `
            <div class="grid grid-cols-2 gap-2 w-full max-w-xs">
        `;

        weights.forEach((weight, index) => {
            const percentage = ((weight / total) * 100).toFixed(1);
            html += `
                <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded" style="background-color: ${colors[index]}"></div>
                    <div class="text-sm">
                        <div class="font-medium">${labels[index]}</div>
                        <div class="text-gray-600">${percentage}%</div>
                    </div>
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
     * Create bar chart for final rankings
     */
    static createRankingsBarChart(containerId, rankings) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const maxScore = Math.max(...rankings.map(item => item.score));
        const colors = ['#FCD34D', '#9CA3AF', '#F59E0B', '#6B7280', '#374151'];

        let html = `
            <div class="rankings-bar-chart">
                <h4 class="text-center font-semibold mb-6">Ranking Dosen Berdasarkan Skor AHP</h4>
                <div class="space-y-4">
        `;

        rankings.forEach((item, index) => {
            const percentage = (item.score / maxScore) * 100;
            const color = colors[item.rank - 1] || colors[4];
            
            html += `
                <div class="flex items-center space-x-4">
                    <div class="w-16 text-right text-sm font-bold">#${item.rank}</div>
                    <div class="w-20 text-sm font-medium">${item.name}</div>
                    <div class="flex-1 bg-gray-200 rounded-full h-10 relative min-w-0">
                        <div class="h-10 rounded-full flex items-center justify-between px-3 text-white text-sm font-medium transition-all duration-700 hover:shadow-lg"
                             style="width: ${percentage}%; background-color: ${color}">
                            <span>${item.score.toFixed(4)}</span>
                            <span>${(item.score * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Create comparison radar chart (simplified version)
     */
    static createComparisonRadar(containerId, alternativeWeights, criteriaNames) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const alternatives = Object.keys(alternativeWeights[criteriaNames[0]] || {}).map((_, i) => `Dosen ${String.fromCharCode(65 + i)}`);
        
        let html = `
            <div class="comparison-radar">
                <h4 class="text-center font-semibold mb-6">Perbandingan Dosen per Kriteria</h4>
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                            <tr class="bg-blue-50">
                                <th class="border border-gray-300 p-3 text-left font-semibold">Dosen</th>
        `;

        criteriaNames.forEach(criterion => {
            html += `<th class="border border-gray-300 p-3 text-center font-semibold">${criterion}</th>`;
        });

        html += `
                            </tr>
                        </thead>
                        <tbody>
        `;

        alternatives.forEach((alternative, altIndex) => {
            html += `
                <tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">${alternative}</td>
            `;

            criteriaNames.forEach(criterion => {
                const weights = alternativeWeights[criterion];
                const weight = weights ? weights[altIndex] : 0;
                const percentage = (weight * 100).toFixed(1);
                const barWidth = weight * 100;
                
                html += `
                    <td class="border border-gray-300 p-2">
                        <div class="flex items-center space-x-2">
                            <div class="flex-1 bg-gray-200 rounded-full h-4 min-w-0">
                                <div class="bg-blue-500 h-4 rounded-full transition-all duration-500" 
                                     style="width: ${barWidth}%"></div>
                            </div>
                            <span class="text-xs font-mono w-12">${percentage}%</span>
                        </div>
                    </td>
                `;
            });

            html += '</tr>';
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Create consistency status visualization
     */
    static createConsistencyVisualization(containerId, consistencyResults) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `
            <div class="consistency-visualization">
                <h4 class="text-center font-semibold mb-6">Status Konsistensi Matriks</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        `;

        Object.entries(consistencyResults).forEach(([name, result]) => {
            const { cr } = result;
            let statusClass, statusText, statusIcon;
            
            if (cr < 0.1) {
                statusClass = 'border-green-400 bg-green-50';
                statusText = 'Konsisten';
                statusIcon = '✓';
            } else if (cr < 0.2) {
                statusClass = 'border-yellow-400 bg-yellow-50';
                statusText = 'Cukup Konsisten';
                statusIcon = '⚠';
            } else {
                statusClass = 'border-red-400 bg-red-50';
                statusText = 'Tidak Konsisten';
                statusIcon = '✗';
            }

            const displayName = name === 'criteria' ? 'Kriteria' : name;

            html += `
                <div class="border-2 rounded-lg p-4 ${statusClass}">
                    <div class="text-center">
                        <div class="text-2xl mb-2">${statusIcon}</div>
                        <h5 class="font-semibold mb-2">${displayName}</h5>
                        <div class="text-sm space-y-1">
                            <div>CR: <span class="font-mono">${cr.toFixed(4)}</span></div>
                            <div class="font-medium">${statusText}</div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
                <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 class="font-semibold mb-2">Keterangan:</h5>
                    <ul class="text-sm space-y-1">
                        <li><span class="text-green-600">✓ Konsisten:</span> CR < 0.1 (Sangat baik)</li>
                        <li><span class="text-yellow-600">⚠ Cukup Konsisten:</span> 0.1 ≤ CR < 0.2 (Dapat diterima)</li>
                        <li><span class="text-red-600">✗ Tidak Konsisten:</span> CR ≥ 0.2 (Perlu diperbaiki)</li>
                    </ul>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Create sensitivity analysis visualization
     */
    static createSensitivityAnalysis(containerId, baseResults) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `
            <div class="sensitivity-analysis">
                <h4 class="text-center font-semibold mb-6">Analisis Sensitivitas</h4>
                <div class="space-y-6">
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h5 class="font-semibold mb-2">Stabilitas Ranking</h5>
                        <p class="text-sm text-gray-700">
                            Ranking saat ini didasarkan pada perbandingan matriks yang telah diinput. 
                            Perubahan kecil pada nilai perbandingan dapat mempengaruhi hasil akhir.
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white border rounded-lg p-4">
                            <h6 class="font-semibold mb-3">Top 3 Dosen</h6>
                            <div class="space-y-2">
        `;

        baseResults.slice(0, 3).forEach((item, index) => {
            const medals = ['🥇', '🥈', '🥉'];
            html += `
                <div class="flex items-center justify-between p-2 rounded ${index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : 'bg-amber-100'}">
                    <span>${medals[index]} ${item.name}</span>
                    <span class="font-mono text-sm">${item.score.toFixed(4)}</span>
                </div>
            `;
        });

        html += `
                            </div>
                        </div>
                        
                        <div class="bg-white border rounded-lg p-4">
                            <h6 class="font-semibold mb-3">Gap Analysis</h6>
                            <div class="space-y-2 text-sm">
        `;

        for (let i = 0; i < baseResults.length - 1; i++) {
            const current = baseResults[i];
            const next = baseResults[i + 1];
            const gap = ((current.score - next.score) / current.score * 100).toFixed(1);
            
            html += `
                <div class="flex justify-between">
                    <span>#${current.rank} vs #${next.rank}:</span>
                    <span class="font-mono">${gap}%</span>
                </div>
            `;
        }

        html += `
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Generate complete visualization dashboard
     */
    static generateDashboard(containerId, results) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const { criteriaWeights, alternativeWeights, finalScores, consistencyResults } = results;
        const criteriaNames = window.ahpData.getCriteria();

        let html = `
            <div class="visualization-dashboard space-y-8">
                <!-- Rankings Chart -->
                <div id="rankings-chart" class="bg-white rounded-lg shadow-md p-6">
                    <!-- Will be populated by createRankingsBarChart -->
                </div>
                
                <!-- Criteria Pie Chart -->
                <div id="criteria-chart" class="bg-white rounded-lg shadow-md p-6">
                    <!-- Will be populated by createCriteriaPieChart -->
                </div>
                
                <!-- Comparison Table -->
                <div id="comparison-radar" class="bg-white rounded-lg shadow-md p-6">
                    <!-- Will be populated by createComparisonRadar -->
                </div>
                
                <!-- Consistency Status -->
                <div id="consistency-viz" class="bg-white rounded-lg shadow-md p-6">
                    <!-- Will be populated by createConsistencyVisualization -->
                </div>
                
                <!-- Sensitivity Analysis -->
                <div id="sensitivity-analysis" class="bg-white rounded-lg shadow-md p-6">
                    <!-- Will be populated by createSensitivityAnalysis -->
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Populate each section
        this.createRankingsBarChart('rankings-chart', finalScores);
        this.createCriteriaPieChart('criteria-chart', criteriaWeights, criteriaNames);
        this.createComparisonRadar('comparison-radar', alternativeWeights, criteriaNames);
        this.createConsistencyVisualization('consistency-viz', consistencyResults);
        this.createSensitivityAnalysis('sensitivity-analysis', finalScores);
    }

    /**
     * Export visualization as image (simplified version)
     */
    static exportAsImage(containerId) {
        // This would require html2canvas library in a real implementation
        // For now, we'll just show an alert
        alert('Fitur export gambar akan tersedia dalam versi mendatang. Gunakan screenshot browser untuk saat ini.');
    }

    /**
     * Print visualization
     */
    static printVisualization() {
        window.print();
    }
}

// Make available globally
window.AHPVisualization = AHPVisualization;
