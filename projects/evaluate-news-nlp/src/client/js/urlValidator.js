const isGoodUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

function isValidUrl(inputUrl) {
    
    if(inputUrl == '') {
        alert('URL is required.')
        return false
    } else {
        if(isGoodUrl(inputUrl)) {
            return true
        } else {
            alert('Invalid URL !')
            return false
        }
    }
}

export { isValidUrl }
