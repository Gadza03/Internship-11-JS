let books = [];

do {
  let title = validateText("Enter a title: ");
  let price = validatePrice();
  let genre = validateText("Enter a ganre: ");

  let book = {
    title: title,
    price: price,
    genre: genre,
  };

  books.push(book);
} while (confirm("Do you want to continue?"));

const averagePriceBooks = averagePrice().toFixed(2);
console.log(`Average price of books is: ${averagePriceBooks}$`);

const bookWithMaxDeviation = getBookWithMaxDeviation();
console.log(`\nBook with max deviation is:`);
console.log(bookWithMaxDeviation);

const sortedBooksWithDeviation = books.sort(
  (a, b) => a.deviation - b.deviation
);
console.log("\nBooks sorted by deviation from the average price:");
sortedBooksWithDeviation.forEach((book) => {
  console.log(`${book.title} - Deviation: ${book.deviation.toFixed(2)}`);
});

function getBookWithMaxDeviation() {
  let maxDeviation = -1;
  let bookWithMaxDeviation = null;

  books.forEach((book) => {
    const deviation = Math.abs(book.price - averagePriceBooks);

    book.deviation = deviation;
    if (deviation > maxDeviation) {
      maxDeviation = deviation;
      bookWithMaxDeviation = book;
    }
  });

  return bookWithMaxDeviation;
}

function averagePrice() {
  let sumOfPrices = 0;

  books.forEach((book) => (sumOfPrices += book.price));

  return sumOfPrices / books.length;
}

function validateText(textPrompt) {
  let text = "";

  do {
    text = prompt(textPrompt).trim();
    if (text.length < 2) {
      alert(
        "This field can't be empty, or shorter than 2 characters.\nTry Again."
      );
    }
  } while (text.length < 2);

  return text;
}

function validatePrice() {
  let price = 0;

  do {
    price = prompt("Enter a price of book: ").trim();
    price = parseFloat(price);

    if (isNaN(price) || price <= 0) {
      alert("Price have to be a number and greater than 0.\n Try again.");
    }
  } while (price <= 0 || isNaN(price));

  return price;
}
