<script>
	import { onMount } from 'svelte'
  
  let file
  let report = ""
  
  async function onFileInputChange() {
    try {
      file = this.files[0]
      report = "sending file..."
      const res = await fetch(`/api/upload?name=${file.name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: file
      })
      report = await res.text()
    } catch (ex) {
      console.error(ex)
    }
  }
</script>

<input on:change={onFileInputChange} type="file" id="input"/>
<p>{report}</p>