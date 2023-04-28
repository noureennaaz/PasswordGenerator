const displayLength=document.querySelector("[len]");
const sliderval=document.querySelector("[Slider]");
const passwordOp=document.querySelector("[generatedPassword]");
const copyButton=document.querySelector("[copy-button]");
const copyMsg=document.querySelector("[text-copied]");
const upperCase=document.querySelector("#includeUppercase");
const lowerCase=document.querySelector("#includeLowercase");
const numbers=document.querySelector("#includeNum");
const symbols=document.querySelector("#Symbols");
const allCheckboxes=document.querySelectorAll("input[type=checkbox]");
const SymbolStr='!@"#$%^&{)>:}/~*(_+-=]\\`[|?/.,₹<";';
const indicator=document.querySelector('indicator');
const generate=document.querySelector('[FinalButton]');
var count=0;
// Initial values

// let password="";
const passwordLength=10;
// let checkcount=1;
// // circle grey
// functions
// handleslider
// copy
// generate password 
// set indicator
console.log(sliderval);
handleSlider();

function handleSlider()
{
    sliderval.value=passwordLength;
    displayLength.innerText=passwordLength;
}
// setIndicatorColor(yellow);
function setIndicatorColor(color)
{
    indicator.style.backgroundColor=color;

}

//The important part 
function getval(min , max)
{
    return min+Math.floor(Math.random()*(max-min));
}
function getnum()
{
    return getval(0,9);
}
function getlowercase()
{
    return String.fromCharCode(getval(97,123));
}
function getuppercase()
{
    return String.fromCharCode(getval(65,91));
}
function getSymbols()
{
    let n=getnum(0, SymbolStr.length);
    return SymbolStr.charAt(n);
}
function indicate()
{
    var IsUpper=false;
    var IsLower=false;
    var sym=false;
    var num=false;

    if(upperCase.checked) IsUpper=true;
    if(lowerCase.checked) IsLower=true;
    if(symbols.checked) sym=true;
    if(num.checked) num=true;

    if(passwordLength>=8 && IsUpper && IsLower &&(sym || num))
       setIndicatorColor("#0f0");
    else if((IsLower|| IsUpper ) && (num||sym) && passwordLength>=6)
       setIndicatorColor('#ff0');
    else
       setIndicatorColor('#f00');

}

//async function ? .. cause it makes 'await' work 
//await waits for the promise to resolve 

function copyfunction()
{
    try{
        navigator.clipboard.writeText(passwordOp.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed"

    }

    //to make the copied message visible
    copyMsg.classList.add('active'); 
    setTimeout( ()=> {copyMsg.classList.remove("active");},2000);


}

sliderval.addEventListener('input' ,(e)=>{
    displayLength.innerText=e.target.value;
    passwordLength=e.target.value;
    console.log(passwordLength);
    handleSlider();

});

copyButton.addEventListener( 'click' ,()=>{
    if(passwordOp.value)
       copyfunction();
})

let handlecheckbox=function()
{
    count=0;
    allCheckboxes.forEach('checkbox')
    {
        if(checkbox.checked)
           count++;
    }
    if (passwordLength<count)
    {
        passwordLength=count;
        handleSlider();
    } }

allCheckboxes.forEach( (checkbox)=>{
    checkbox.addEventListener('change', handlecheckbox);
} )

generate.addEventListener('click',()=>{

    if(count<=0)
       return;
    else if(passwordLength<count)
    {
        passwordLength=count;
        handleSlider();
    }
    

    // THE LOGIC........

    // If something present remove it 
    
    passwordOp="";

     //made aa function array 
    let functionArray=[];

    //push the specific function according to the checked status of the checkboxes 
    if(upperCase.checked)
        functionArray.push(getuppercase());
    if(lowerCase.checked)
        functionArray.push(getlowercase());
    if(symbols.checked)
        functionArray.push(getSymbols());
    if(numbers.checked)
        functionArray.push(getnum());
    for(let i=4 ; i<=functionArray.length; i++)
    {
        passwordOp+=functionArray[i]();
    }
    for(let i=0 ; i<passwordLength-functionArray.length ; i++)
    {
        let index=getval(0,functionArray.length);
        passwordOp+=functionArray[index]();
    }

    //suffle the added value
    indicate();
})


