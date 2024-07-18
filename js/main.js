

// FETCH DATA
async function customersAndTransactions(){
    const customers= await fetch(`https://6694c0494bd61d8314c87470.mockapi.io/api/Data/customers`)
    const userData= await customers.json()
    const transactions= await fetch(`https://6694c0494bd61d8314c87470.mockapi.io/api/Data/transactions`)
    const transData= await transactions.json()

    display(userData,transData)
}

customersAndTransactions()

// DISPLAY DATA 
function display(userData,transData){
    let data=``
    for(let i=0;i<userData.length;i++){
        for(let k=0; k<transData.length;  k++){
            if(transData[k].customer_id==userData[i].id){
                data +=`
                <tr>
                    <td>${transData[k].id}</td>
                    <td>${userData[i].name}</td>
                    <td>${userData[i].id}</td>
                    <td>${transData[k].amount}</td>
                    <td>${transData[k].date}</td>
                    <td ><button data-id="${userData[i].id}"   data-name="${userData[i].name}"   class="btn btn-primary">View</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById("table").innerHTML= data
    char(transData)
    search(userData,transData)
    
}

// SEARCH 
function search(userData,transData){
    document.querySelectorAll("input").forEach((input)=>{
        input.addEventListener("keyup",()=>{
            const tybe =input.getAttribute("data-search")
            const search= input.value
            //SEARCH BY NAME
            if(tybe=='name'){
                let name=""
                for(let i=0;i<userData.length;i++){
                    for(let k=0;  k<transData.length;  k++){
                        if(userData[i].name.toLowerCase().includes(search.toLowerCase())){
                        if(transData[k].customer_id==userData[i].id){
                            name +=`
                            <tr>
                                <td>${transData[k].id}</td>
                                <td>${userData[i].name}</td>
                                <td>${userData[i].id}</td>
                                <td>${transData[k].amount}</td>
                                <td>${transData[k].date}</td>
                                <td><button data-id="${userData[i].id}"   data-name="${userData[i].name}"  class="btn btn-primary">Graph</button></td>
                            </tr>
                            
                            `
                        }
                    }
                }
            }

                document.getElementById("table").innerHTML= name
                char(transData)
            }
            //SEARCH BY AMOUNT 
            else{
                let amount=""
                 for(let i=0;i<userData.length;i++){
                    for(let k=0;k<transData.length;  k++){
                        if((JSON.stringify(transData[k].amount)).includes(search)){
                        if(transData[k].customer_id==userData[i].id){
                            amount +=`
                            <tr>
                                <td>${transData[k].id}</td>
                                <td>${userData[i].name}</td>
                                // <td>${userData[i].id}</td>
                                <td>${transData[k].amount}</td>
                                <td>${transData[k].date}</td>
                                <td><button data-id="${userData[i].id}"  data-name="${userData[i].name}"  class="btn btn-primary">Graph</button></td>
                            </tr>
                            
                            `
                        }
                    }
                }
            }
                document.getElementById("table").innerHTML= amount
                char(transData)
            }
        })
    })
}


//CHART
function char(transData) {
    document.querySelectorAll("button").forEach((click)=>{

        click.addEventListener("click",()=>{
            const naem= click.getAttribute("data-name")
            const id= click.getAttribute("data-id")
           const customerTransactions = transData.filter(t => t.customer_id == id);
            const data = {
                labels: customerTransactions.map(t => t.date),
                datasets: [
                    {
                        name: naem + "'s Transaction Amount",
                        values: customerTransactions.map(t => t.amount),
                    },
                ]
            }
            const chart = new frappe.Chart("#chart", {  
                                                        
                title: `${naem} Chart`,
                data: data,
                type: 'axis-mixed', 
                height: 250,
                colors: ['#7cd6fd', '#743ee2']
            })
        })
    })
}