function handleSubmit(event) {
    const Polarity = {
        'P+': 'STRONG POSITIVE',
        'P': 'POSITIVE',
        'NEU': 'NEUTRAL',
        'N': 'NEGATIVE',
        'N+': 'STRONG NEGATIVE',
        'NONE': 'WITHOUT POLARITY',
    }

    event.preventDefault()

    document.getElementById('results').innerHTML = '<br />Analysing...'

    //get url data from UI
    let url = document.getElementById('url').value
    if (Client.isValidUrl(url)) { 
        fetch(`http://localhost:8081/sentiment?url=${url}`)
        .then(res => res.json())
        .then(function(res) {
            const result = ''
            +  '<br /> Polarity: ' +  Polarity[res.polarity]
            +  '<br /> Subjectivity: ' +  res.subjectivity
            +  '<br /> Agreement: ' +  res.agreement
            +  '<br /> Confidence: ' +  res.confidence
            +  '<br /> Irony: ' +  res.irony

            document.getElementById('results').innerHTML = result
        })
    } else {
        document.getElementById('results').innerHTML = ''
    }
}

function onBlur(){
    document.getElementById('results').innerHTML = ''
    //get url data from UI
    let url = document.getElementById('url').value
    Client.isValidUrl(url)
}

export { handleSubmit, onBlur }
