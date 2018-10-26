import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index"

// https://restcustomerservice20181024070909.azurewebsites.net/api/customer


    interface Icustomer {
        id : number;
        firstName : string;
        lastName : string;
        year : number;
    }



    let divElement : HTMLDivElement = <HTMLDivElement> document.getElementById("content")
    let divElementById : HTMLDivElement = <HTMLDivElement> document.getElementById("contentById")
    let divElementDeleteById : HTMLDivElement = <HTMLDivElement> document.getElementById("deleteContentById")

    let getAllButtonElement : HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton")
    getAllButtonElement.addEventListener("click",showAllCustomers)

    let getCustomerById : HTMLButtonElement = <HTMLButtonElement> document.getElementById("getCustomerByIdButton")
    getCustomerById.addEventListener("click",showACustomer)

    let addCustomer : HTMLButtonElement = <HTMLButtonElement> document.getElementById("addCustomerButton")
    addCustomer.addEventListener("click",addACustomer)

    let deleteCustomer : HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteCustomerButton")
    deleteCustomer.addEventListener("click",deleteACustomer)




    let uri : string = "https://restcustomerservice20181024070909.azurewebsites.net/api/customer"

    
    function showAllCustomers() : void
    {
        axios.get<Icustomer[]>(uri)
        .then(function(response:AxiosResponse<Icustomer[]>):void
        {
            let result : string = "<ol>";
            response.data.forEach((customer : Icustomer) => 
            {
                if(customer == null)
                {
                    result += "<li>NULL Element</li>"
                }
                else
                {
                    result += "<li>" + "<b>Customer ID: </b>" + customer.id.toString() + " <b>Customer's first name: </b>" + customer.firstName + " <b>Customer last name: </b>" + customer.lastName + " <b>Customer year: </b>" + customer.year.toString() + " " + "</li>"
                }
            })
            result += "</ol>"

            divElement.innerHTML = result;
        }
        )
        .catch(function(error:AxiosError):void
        {
            divElement.innerHTML = error.message
        })  
    }

    
    function showACustomer() : void
    {
        let findCustomerElement : HTMLInputElement = <HTMLInputElement> document.getElementById("findCustomer")
        let cusCustomer : string = findCustomerElement.value

        axios.get<Icustomer>(uri + "/" + cusCustomer)
        .then(function(response:AxiosResponse<Icustomer>):void
        {
         
            let result : string = "<ol>" + "<b>Customer ID: </b>" + response.data.id.toString() + " <b>Customer's first name: </b>" + response.data.firstName + " <b>Customer last name: </b>" + response.data.lastName + " <b>Customer year: </b>" + response.data.year.toString() + " " + "</ol>"

            divElementById.innerHTML = result;
        }
        )
        .catch(function(error:AxiosError):void
        {
            divElementById.innerHTML = error.message
        })
    }


    function addACustomer() : void
    {

        let addFirstNameElement : HTMLInputElement = <HTMLInputElement> document.getElementById("addCustomerFirstName")
        let addLastNameElement : HTMLInputElement = <HTMLInputElement> document.getElementById("addCustomerLastName")
        let addYearElement : HTMLInputElement = <HTMLInputElement> document.getElementById("addCustomerYear")

        let cusFirstName : string = addFirstNameElement.value;
        let cusLastName : string = addLastNameElement.value;
        let cusYear : number = +addYearElement.value;

        axios.post<Icustomer>(uri, {firstName : cusFirstName, lastName : cusLastName, year : cusYear})
        .then((response:AxiosResponse) => {console.log("response " + response.status + " " + response.statusText)})
        .catch((error:AxiosError) => {console.log(error);})
    }


    function deleteACustomer() : void
    {
        
        let deleteCustmer : HTMLInputElement = <HTMLInputElement> document.getElementById("deleteCustomer")
        let cusCustomer : string = deleteCustmer.value;

        axios.delete(uri + "/" + cusCustomer)
            .then(function (response: AxiosResponse<Icustomer>): void
            {
                console.log(JSON.stringify(response));
                divElementDeleteById.innerHTML = response.status + " " + response.statusText
            })
            
        

    }