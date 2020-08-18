

function deletexd(id) {
    console.log(id)
    fetch('/delete/' + id, {
        method: 'DELETE',
    })
}