<script lang="ts">
  import BST from "$lib/data-structures/binary-search-tree";

    let bst = new BST([5])
    let displayBST = JSON.stringify(bst.levelOrder())

    function handleAdd(e: any) {
        const formData = new FormData(e.target)
        const value = formData.get('value') as unknown as number
        bst.insert(value, bst.root)
        displayBST = JSON.stringify(bst.levelOrder())
    }

    function handleRemove(e: any) {
        const formData = new FormData(e.target)
        const index = formData.get('key') as unknown as number
        bst.delete(index)
        displayBST = JSON.stringify(bst.levelOrder())
    }
</script>

<div class="flex flex-col h-[100vh] gap-5 w-full justify-center items-center">
    <!-- <button on:click={() => console.log(linkedList.toString())}>log</button> -->
    <h1 class="h1 text-center">
        {displayBST}
    </h1>
    <div class="flex gap-3">
        <form on:submit={handleAdd} class="card p-3 rounded-sm flex justify-center gap-4 items-center flex-col">
            <input type="text" class="input px-3 rounded-sm" id="value" required name="value" placeholder="value">
        <button type="submit" class="rounded-md w-20 variant-filled h-8">add</button>
        </form>
        <form on:submit={handleRemove} class="card p-3 rounded-sm flex justify-center gap-4 items-center flex-col">
            <input type="text" class="input px-3 rounded-sm" id="key" required name="key" placeholder="value">
            <button type="submit" class="rounded-md w-20 variant-filled h-8">delete</button>
        </form>
    </div>
    
</div>