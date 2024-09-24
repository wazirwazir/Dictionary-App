let apiUrl 
const input = document.querySelector('input')
let datas;
input.onkeydown = searchWord

function searchWord (word) {
    if (word.keyCode == 13) {
        apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        getMeaning()
    }
    
    
}

function renderMeaning() {
    const container = document.querySelector('.wrapper')
    const meaning = document.querySelector('#meaning')
    const clone = document.importNode(meaning.content, true)
    container.appendChild(clone)

}
//datas[0].meanings[0].definitions
async function getMeaning() {
    try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data[0])
        datas = data
    } catch (error) {
        console.error('Error fetching or processing data:', error.message)
    }

    
    //meaning.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><rect width="2.8" height="12" x="1" y="6" fill="currentColor"><animate id="svgSpinnersBarsScale0" attributeName="y" begin="0;svgSpinnersBarsScale1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="0;svgSpinnersBarsScale1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect><rect width="2.8" height="12" x="5.8" y="6" fill="currentColor"><animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect><rect width="2.8" height="12" x="10.6" y="6" fill="currentColor"><animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect><rect width="2.8" height="12" x="15.4" y="6" fill="currentColor"><animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.3s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.3s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect><rect width="2.8" height="12" x="20.2" y="6" fill="currentColor"><animate id="svgSpinnersBarsScale1" attributeName="y" begin="svgSpinnersBarsScale0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12"/></rect></svg>`
    placeMeaning()
}

function placeMeaning() {
    const phonetic = document.querySelector('#phonetic')
    const word = document.querySelector('.word h1')
    let meaning = document.querySelector('#meaning')
    const source = document.getElementById('sourceUrls')
    source.href = datas[0].sourceUrls
    source.textContent = datas[0].sourceUrls
    phonetic.textContent = datas[0].phonetic
    word.textContent = datas[0].word

    const html = datas.map(entry => {
        // Render each word and its meanings
        return `
        <div class="entry">
            ${entry.meanings.map(meaning => `
            <h3>${meaning.partOfSpeech}</h3>
            <ul>
                ${meaning.definitions.map(definition => `
                <li>${definition.definition}</li>
                `).join('')}
            </ul>
            `).join('')}
        </div>
        `;
      }).join('');  // Join array of HTML strings
    
      // Insert the generated HTML into the DOM
    

    meaning.innerHTML = html
}
function playAudio() {
    const audio = document.querySelector('audio')
}
function switchButton()  {
    const switchBtn = document.querySelector('.switch')
    switchBtn.addEventListener('click', () => {
        console.log('wem')
        switchBtn.classList.toggle('swit')
    })
}
switchButton()
renderMeaning()

