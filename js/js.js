//Book Class: Represent a Book
class Book
{
    constructor(title,author,isbn)
    {
         this.title=title;
         this.author=author;
         this.isbn=isbn;
    }
}


//UI Class: Handle UI Tasks
class UI{
    static displayBooks()
    {
        const books=store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));
    }
   static addBookToList(book)
    {
        const list=document.querySelector("#book-list");
        const row=document.createElement("tr");
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#"class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    } 
    static clearFeild()
    {
        document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#isbn").value="";
    } 
    static clearItem(el)
    {
        if(el.classList.contains("delete"))
        {
            el.parentElement.parentElement.remove();
        }
    } 
    static showAlert(message,color)
    {
       const div= document.createElement("div");
       div.className=`alert alert-${color}`;
       div.appendChild(document.createTextNode(message));
       const container=document.querySelector(".container");
       const form=document.querySelector("#book-form");
       container.insertBefore(div,form);
       setTimeout(_=>document.querySelector(".alert").remove(),3000)
    }
    
}


//Store Class:handel Storage
class store{
    static getBooks()
    {
        let books;
        if(localStorage.getItem("Books")===null)
        {
            books=[];
        }
        else
        {
            books=JSON.parse(localStorage.getItem("Books"));
        }
        return books;
    }
    static addBooks(book)
    {
       const books=store.getBooks();
       books.push(book);
       localStorage.setItem("Books",JSON.stringify(books));
    }
    static removeBooks(isbn)
    {
        const books=store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn==isbn)
            {
                books.splice(index,1);
            }
            localStorage.setItem("Books",JSON.stringify(books));
        })
    }
}


//Event: Display Books
document.addEventListener("DOMContentLoaded",UI.displayBooks);


//Event: Add Book
document.querySelector("#book-form").addEventListener("submit",(e)=>{

    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const isbn=document.querySelector("#isbn").value;

    //validate
    if(title=="" || author=="" ||isbn=="")
    {
        UI.showAlert("please fill this item","danger")
    }
    else
    {
        book=new Book(title,author,isbn);
        UI.addBookToList(book);

        store.addBooks(book);

        UI.clearFeild();
        
        UI.showAlert("Book Added","success");
    }

})

//Event: Remove
document.querySelector("#book-list").addEventListener("click",(e)=>{
    const el=e.target
    UI.clearItem(el);
    // store.removeBooks();
    store.removeBooks(el.parentElement.previousElementSibling.textContent);
    UI.showAlert("Book Removed","success");
})


