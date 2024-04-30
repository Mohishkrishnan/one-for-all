document.addEventListener("DOMContentLoaded", function() {
    const fromText = document.querySelector(".inp");
    toText = document.querySelector(".opt");
    selectTags = document.querySelectorAll("select");
    translateBtn = document.querySelector("button");
    selectTags.forEach((tag,id) => {
        for(const country_code in countries){
            let selected;
            if(id==0 && country_code=="en-US"){
                selected="selected";
            }
            else if(id==1 && country_code=="hi-IN"){
                selected="selected";
            }
            let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend",option);
        }
    });

    translateBtn.addEventListener("click",() => {
        let text = fromText.value;
        translateFrom = selectTags[0].value,
        translateTo = selectTags[1].value;
        let apiUrl=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
        fetch(apiUrl).then(res => res.json()).then(data => {
            console.log(data);
            toText.value=data.responseData.translatedText;
        });
    })
});
