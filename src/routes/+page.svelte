<script>
	import { onMount } from 'svelte'
  import axios from 'axios'

  let file
  let report = ""
  
  async function onFileInputChange() {
    try {
      file = this.files[0]
      report = "sending file..."
      const res = await axios.post(`/api/upload?name=${file.name}`, file)
      report = res.data
    } catch (ex) {
      console.error(ex)
    }
  }
</script>

<input on:change={onFileInputChange} type="file" id="input"/>
<p>{report}</p>