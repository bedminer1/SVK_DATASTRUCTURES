<script lang="ts">
    import LinkedList from '$lib/data-structures/linked-list'

    // example code to test
    const linkedList = new LinkedList()
    linkedList.prepend(4)
    linkedList.append(2)
    let displayLinkedList = linkedList.toString()

    // handle appending
    function handleAppend(e: any) {
        const formData = new FormData(e.target)
        linkedList.append(formData.get('newNode') as unknown as number)
        displayLinkedList = linkedList.toString()
    }
</script>

<div class="flex flex-col h-[100vh] w-full justify-center items-center">
    <form on:submit={handleAppend}>
        <input type="numeric" class="input px-3" id="newNode" required name="newNode">
        <button type="submit">append</button>
    </form>
    <button on:click={() => console.log(linkedList.toString())}>log</button>
    <h1 class="h1 text-center">
        {displayLinkedList}
    </h1>
    
</div>