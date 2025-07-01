<script>
    export let data;
    
    let inputName = data.name || '';
    
    function handleSubmit() {
        if (inputName.trim()) {
            window.location.href = `/?name=${encodeURIComponent(inputName.trim())}`;
        }
    }
    
    function handleKeydown(event) {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }
</script>

<svelte:head>
  <title>Age Estimator - Descubra a idade estimada de uma pessoa com esse nome</title>
</svelte:head>

<main> 
  <div class="">
    <header>
      <h1>Age Estimator</h1>
      <p>Descubra a idade estimada de qualquer nome</p>
    </header>

    <div>
      <input
          type="text"
        bind:value={inputName}
        placeholder="Digite um nome..."
        autocomplete="off"
        spellcheck="false"
        on:keydown={handleKeydown}
      />
      <button on:click={handleSubmit}>Buscar</button>
    </div>

    <div>
      {#if data.result}
        <h2>Resultado:</h2>
        <p><strong>Nome:</strong> {data.result.name}</p>
        <p><strong>Idade estimada:</strong> {data.result.age || 'Não encontrado'}</p>
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
  }

  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    background: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #005a9e;
  }
</style>