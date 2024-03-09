<script lang="ts">
    import HashMap from '$lib/data-structures/hashmap'

    // example code to test
    const hashMap = new HashMap()
    let entries: string

    function handleAdd(e: any) {
        const formData = new FormData(e.target)
        const key = formData.get('key') as string
        const value = formData.get('value') as string
        hashMap.add(key, value)
        entries = JSON.stringify(hashMap.entries())
    }

</script>

<div class="flex flex-col h-[100vh] gap-5 w-full justify-center items-center">
    <!-- <button on:click={() => console.log(linkedList.toString())}>log</button> -->
    <h1 class="h1 text-center">
        {entries}
    </h1>
    <form on:submit={handleAdd} class="card p-3 rounded-sm flex justify-center gap-4 items-center flex-col">
        <input type="text" class="input px-3 rounded-sm" id="key" required name="key" placeholder="key">
        <input type="text" class="input px-3 rounded-sm" id="value" required name="value" placeholder="value">
        <button type="submit" class="rounded-md w-20 variant-filled h-8">add</button>
    </form>
</div>