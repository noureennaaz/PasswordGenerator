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
const SymbolStr='!@#$%^&{)>}/~*(_+-=]\\`[|?/₹<';
const indicator=document.querySelector('[indicator]');
const generate=document.querySelector('[FinalButton]');
var count=0;

// Initial values

let passwordLength=10;
let password="";


// circle color
// functions
// handleslider
// copy
// generate password 
// set indicator
setIndicatorColor("#ccc");
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
    indicator.style.boxShadow='0px 0px 12px 1px ${color}';

}

//The value generators part 
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
    let n=getval(0, SymbolStr.length);
    return SymbolStr.charAt(n);
}

// indicators
function indicate()
{
    var IsUpper=false;
    var IsLower=false;
    var sym=false;
    var num=false;

    if(upperCase.checked) IsUpper=true;
    if(lowerCase.checked) IsLower=true;
    if(symbols.checked) sym=true;
    if(numbers.checked) num=true;
    
   if(passwordLength>=5 && IsUpper && IsLower && num && sym)
      setIndicatorColor('#f00');

    else if(passwordLength>=8 && IsUpper && IsLower &&(sym || num))
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
    handleSlider();

});

copyButton.addEventListener( 'click' ,()=>{
    if(passwordOp.value)
       copyfunction();
})

let handlecheckbox=function()
{
    count=0;
    allCheckboxes.forEach((checkbox)=>
    {
        if(checkbox.checked)
           count++;
    }
    );
    if (passwordLength<count)
    {
        passwordLength=count;
        handleSlider();
    } 
}

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
    // console.log(passwordLength);

    // THE LOGIC........

    // If something present remove it 
    
    password="";

     //made aa function array 
    let funcArr=[];

    //push the specific function according to the checked status of the checkboxes 
    if(upperCase.checked)
        funcArr.push(getuppercase);
    if(lowerCase.checked)
        funcArr.push(getlowercase);
    if(symbols.checked)
        funcArr.push(getSymbols);
    if(numbers.checked)
        funcArr.push(getnum);

    
    funcArr.forEach((func)=>{
        password+=func();
    })
    
    for(let i=0 ; i<passwordLength-funcArr.length ; i++)
    {
        let index=getval(0,funcArr.length);
        password+=funcArr[index]();
    }
    // console.log(password);

    //shuffle the added value
    passwordOp.value=shuffleStr(Array.from(password));
    indicate();

});
function shuffleStr(arr)
{
    let index=0;
    let temp=0;
    for(let i=0 ; i<passwordLength ; i++)
    {
        index=getval(0,passwordLength);
        temp=arr[i];
        arr[i]=arr[index];
        arr[index]=temp;
        
    }

    let str="";
    arr.forEach((element) =>{
        str+=element
    } );
    return str;
}


