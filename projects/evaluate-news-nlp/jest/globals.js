global.Client = {
    isValidUrl: () => {}
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
        polarity: 'P',
        subjectivity: 'SUBJECTIVE',
        agreement: 'DISAGREEMENT',
        confidence: 91,
        irony: 'NONIRONIC' 
    }),
  })
);