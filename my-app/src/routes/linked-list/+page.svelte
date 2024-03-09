<script lang="ts">
    import LinkedList from '$lib/data-structures/linked-list'

    // example code to test
    const linkedList = new LinkedList()
    let displayLinkedList = '*linked-list here* -> null'

    // handle appending
    function handleAppend(e: any) {
        const formData = new FormData(e.target)
        const value = formData.get('value') as unknown as number
        const index = formData.get('index') as unknown as number
        linkedList.insertAt(value, index)
        displayLinkedList = linkedList.toString()
    }

    // handle deleting
    function handleDelete(e: any) {
        const formData = new FormData(e.target)
        const index = formData.get('index') as unknown as number
        linkedList.deleteAt(index)
        displayLinkedList = linkedList.toString()
    }
</script>

<div class="flex flex-col h-[100vh] gap-5 w-full justify-center items-center">
    <!-- <button on:click={() => console.log(linkedList.toString())}>log</button> -->
    <h1 class="h1 text-center">
        {displayLinkedList}
    </h1>
    <div class="flex gap-3">
        <form on:submit={handleAppend} class="card p-3 rounded-sm flex justify-center gap-4 items-center flex-col">
            <input type="numeric" class="input px-3 rounded-sm" id="value" required name="value" placeholder="value">
            <input type="numeric" class="input px-3 rounded-sm" id="index" required name="index" placeholder="index">
        <button type="submit" class="rounded-md w-20 variant-filled h-8">insert</button>
        </form>
        <form on:submit={handleDelete} class="card p-3 rounded-sm flex justify-center gap-4 items-center flex-col">
            <input type="numeric" class="input px-3 rounded-sm" id="index" required name="index" placeholder="index">
            <button type="submit" class="rounded-md w-20 variant-filled h-8">delete</button>
        </form>
    </div>
    
</div>
