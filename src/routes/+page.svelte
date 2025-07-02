<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	export let data;
	
	let inputValue = data.name || '';
	let debounceTimeout;
	let isDarkMode = false;
	
	onMount(() => {

		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			isDarkMode = savedTheme === 'dark';
		} else {
			isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		updateTheme();
	});
	
	function toggleTheme() {
		isDarkMode = !isDarkMode;
		updateTheme();
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
	}
	
	function updateTheme() {
		if (browser) {
			document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
		}
	}
	
	function handleInput() {
		clearTimeout(debounceTimeout);
		
		debounceTimeout = setTimeout(() => {
			if (browser) {
				const params = new URLSearchParams();
				if (inputValue.trim()) {
					params.set('name', inputValue.trim());
				}
				goto(`?${params.toString()}`, { replaceState: true });
			}
		}, 800);
	}
	
	$: result = data.result;
</script>

<svelte:head>
	<title>Estimador de Idade - Descubra a idade estimada de qualquer nome</title>
	<meta name="description" content="Descubra a idade estimada de qualquer nome usando inteligência artificial" />
</svelte:head>

<main>
	<div class="container">
		<header>
			<div class="header-top">
				<h1>Estimador de Idade</h1>
				<button class="theme-toggle" on:click={toggleTheme} aria-label="Alternar tema">
					{#if isDarkMode}
						<span class="theme-icon">☀️</span>
					{:else}
						<span class="theme-icon">🌙</span>
					{/if}
				</button>
			</div>
			<p>Descubra a idade estimada de qualquer nome</p>
		</header>
		
		<div class="search-section">
			<div class="input-wrapper">
				<input
					type="text"
					bind:value={inputValue}
					on:input={handleInput}
					placeholder="Digite um nome..."
					class="name-input"
					autocomplete="off"
					spellcheck="false"
				/>
				<div class="input-decoration"></div>
			</div>
		</div>
		
		<div class="result-section">
			{#if result}
				<div class="result-card">
					<div class="result-header">
						<h2>{result.name}</h2>
						{#if result.count}
							<span class="confidence">baseado em {result.count.toLocaleString()} pessoas</span>
						{/if}
					</div>
					
					{#if result.age}
						<div class="age-display">
							<span class="age-number">{result.age}</span>
							<span class="age-label">anos</span>
						</div>
						
						<div class="age-range">
							<div class="range-bar">
								<div class="range-fill" style="width: {Math.min((result.age / 100) * 100, 100)}%"></div>
							</div>
							<span class="range-text">Idade estimada</span>
						</div>
					{:else}
						<div class="no-data">
							<p>Não foi possível estimar a idade para este nome</p>
						</div>
					{/if}
				</div>
			{:else if inputValue.trim()}
				<div class="loading">
					<div class="loading-spinner"></div>
					<p>Consultando...</p>
				</div>
			{:else}
				<div class="placeholder">
					<span class="emoji">👋</span>
					<p>Digite um nome acima para descobrir a idade estimada</p>
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	:global(html) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		line-height: 1.6;
		margin: 0;
		padding: 0;
		transition: background-color 0.3s ease, color 0.3s ease;
	}
	
	:global(html[data-theme="light"]) {
		color: #2d3748;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
	}
	
	:global(html[data-theme="dark"]) {
		color: #e2e8f0;
		background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
		min-height: 100vh;
	}
	
	:global(body) {
		margin: 0;
		padding: 0;
	}
	
	:global(*) {
		box-sizing: border-box;
	}
	
	main {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem 1rem;
	}
	
	.container {
		backdrop-filter: blur(10px);
		border-radius: 24px;
		padding: 3rem 2rem;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
		width: 100%;
		max-width: 500px;
		transition: background-color 0.3s ease, border-color 0.3s ease;
	}
	
	:global([data-theme="light"]) .container {
		background: rgba(255, 255, 255, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	
	:global([data-theme="dark"]) .container {
		background: rgba(45, 55, 72, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	header {
		text-align: center;
		margin-bottom: 2.5rem;
	}
	
	.header-top {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin-bottom: 0.5rem;
	}
	
	header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
.theme-toggle {
    position: absolute;
    top: -2rem;
    right: -1rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}
	
	:global([data-theme="light"]) .theme-toggle {
		background: rgba(255, 255, 255, 0.2);
	}
	
	:global([data-theme="light"]) .theme-toggle:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.1);
	}
	
	:global([data-theme="dark"]) .theme-toggle {
		background: rgba(255, 255, 255, 0.1);
	}
	
	:global([data-theme="dark"]) .theme-toggle:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}
	
	.theme-icon {
		font-size: 1.5rem;
		display: block;
	}
	
	header p {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 500;
		transition: color 0.3s ease;
	}
	
	:global([data-theme="light"]) header p {
		color: #6b7280;
	}
	
	:global([data-theme="dark"]) header p {
		color: #a0aec0;
	}
	
	.search-section {
		margin-bottom: 2rem;
	}
	
	.input-wrapper {
		position: relative;
	}
	
	.name-input {
		width: 100%;
		padding: 1rem 1.5rem;
		font-size: 1.2rem;
		border: 2px solid;
		border-radius: 16px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		outline: none;
		font-weight: 500;
	}
	
	:global([data-theme="light"]) .name-input {
		background: #ffffff;
		border-color: #e2e8f0;
		color: #2d3748;
	}
	
	:global([data-theme="light"]) .name-input:focus {
		border-color: #667eea;
		box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
		transform: translateY(-2px);
	}
	
	:global([data-theme="light"]) .name-input::placeholder {
		color: #a0aec0;
	}
	
	:global([data-theme="dark"]) .name-input {
		background: #4a5568;
		border-color: #718096;
		color: #e2e8f0;
	}
	
	:global([data-theme="dark"]) .name-input:focus {
		border-color: #667eea;
		box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
		transform: translateY(-2px);
	}
	
	:global([data-theme="dark"]) .name-input::placeholder {
		color: #a0aec0;
	}
	
	.input-decoration {
		position: absolute;
		bottom: -2px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 3px;
		background: linear-gradient(90deg, #667eea, #764ba2);
		border-radius: 2px;
		transition: width 0.3s ease;
	}
	
	.name-input:focus + .input-decoration {
		width: 80%;
	}
	
	.result-section {
		min-height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.result-card {
		width: 100%;
		text-align: center;
		animation: slideUp 0.4s ease-out;
	}
	
	.result-header {
		margin-bottom: 1.5rem;
	}
	
	.result-header h2 {
		font-size: 1.8rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
		text-transform: capitalize;
		transition: color 0.3s ease;
	}
	
	:global([data-theme="light"]) .result-header h2 {
		color: #2d3748;
	}
	
	:global([data-theme="dark"]) .result-header h2 {
		color: #e2e8f0;
	}
	
	.confidence {
		font-size: 0.9rem;
		font-weight: 500;
		transition: color 0.3s ease;
	}
	
	:global([data-theme="light"]) .confidence {
		color: #6b7280;
	}
	
	:global([data-theme="dark"]) .confidence {
		color: #a0aec0;
	}
	
	.age-display {
		margin: 2rem 0;
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 0.5rem;
	}
	
	.age-number {
		font-size: 4rem;
		font-weight: 800;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
	}
	
	.age-label {
		font-size: 1.5rem;
		font-weight: 600;
		transition: color 0.3s ease;
	}
	
	:global([data-theme="light"]) .age-label {
		color: #6b7280;
	}
	
	:global([data-theme="dark"]) .age-label {
		color: #a0aec0;
	}
	
	.age-range {
		margin-top: 1.5rem;
	}
	
	.range-bar {
		width: 100%;
		height: 8px;
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 0.5rem;
		transition: background-color 0.3s ease;
	}
	
	:global([data-theme="light"]) .range-bar {
		background: #e2e8f0;
	}
	
	:global([data-theme="dark"]) .range-bar {
		background: #4a5568;
	}
	
	.range-fill {
		height: 100%;
		background: linear-gradient(90deg, #667eea, #764ba2);
		border-radius: 4px;
		transition: width 0.8s ease-out;
	}
	
	.range-text {
		font-size: 0.9rem;
		font-weight: 500;
		transition: color 0.3s ease;
	}
	
	:global([data-theme="light"]) .range-text {
		color: #6b7280;
	}
	
	:global([data-theme="dark"]) .range-text {
		color: #a0aec0;
	}
	
	.no-data, .placeholder {
		text-align: center;
		transition: color 0.3s ease;
	}
	
	:global([data-theme="light"]) .no-data, 
	:global([data-theme="light"]) .placeholder {
		color: #6b7280;
	}
	
	:global([data-theme="dark"]) .no-data, 
	:global([data-theme="dark"]) .placeholder {
		color: #a0aec0;
	}
	
	.no-data, .placeholder .emoji {
		font-size: 3rem;
		display: block;
		margin-bottom: 1rem;
	}
	
	.no-data p, .placeholder p {
		font-size: 1.1rem;
		font-weight: 500;
		margin: 0;
	}
	
	.loading {
		text-align: center;
		transition: color 0.3s ease;
	}
	
	:global([data-theme="light"]) .loading {
		color: #6b7280;
	}
	
	:global([data-theme="dark"]) .loading {
		color: #a0aec0;
	}
	
	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 4px solid;
		border-top: 4px solid #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem;
		transition: border-color 0.3s ease;
	}
	
	:global([data-theme="light"]) .loading-spinner {
		border-color: #e2e8f0;
		border-top-color: #667eea;
	}
	
	:global([data-theme="dark"]) .loading-spinner {
		border-color: #4a5568;
		border-top-color: #667eea;
	}
	
	.loading p {
		font-size: 1.1rem;
		font-weight: 500;
		margin: 0;
	}
	
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	@media (max-width: 640px) {
		.container {
			padding: 2rem 1.5rem;
			margin: 1rem;
		}
		
		header h1 {
			font-size: 2rem;
		}
		
		.theme-toggle {
			position: static;
			margin-left: 1rem;
		}
		
		.header-top {
			flex-direction: column;
			gap: 1rem;
		}
		
		.age-number {
			font-size: 3rem;
		}
		
		.age-label {
			font-size: 1.2rem;
		}
	}
</style>