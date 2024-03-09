<script lang="ts">
    import LinkedList from '$lib/data-structures/linked-list'

    let appendValue: string
    // example code to test
    const linkedList = new LinkedList()
    linkedList.append(0)
    linkedList.append(2)
    linkedList.prepend(4)
    $: displayLinkedList = linkedList.toString()
</script>

<div class="flex flex-col size-[100vh] justify-center items-center">
    <h1 class="h1 text-center">
        {displayLinkedList}
    </h1>
    
</div>