## 📖 Question: The Wandering Book Returns to the Library

In a quiet town, the *Library* lends books to readers. But instead of returning the books directly to the Library, readers often pass them along to others. Eventually, someone returns the book back to the Library.

Each transaction is recorded with the following details:

- *Book ID*: the identifier of the book
- *Lender*: the person who gave the book
- *Days Held*: number of days the book was held before passing it on
- *Borrower*: the person who received the book

Your goal is to determine who should pay a fine when a book is returned to the Library.

---

## 🧠 Task: Fine Calculation

A fine is applied *only if* the *total days exceed 10* and the *last borrower is Library*.

In such cases:
- The *last lender* (the person who gave the book back to the Library) must pay a fine.

If the book is returned to the Library within 10 days, *no fine* is charged.

---

## 🧾 Sample Input Table

| Book ID | Lender   | Days Held | Borrower |
|---------|----------|-----------|----------|
| b1      | Library  | 5         | ace      |
| b1      | ace      | 7         | bob      |
| b1      | bob      | 0         | Library  |
| b2      | Library  | 1         | dave     |
| b2      | dave     | 3         | eve      |
| b2      | eve      | 0         | Library  |
| b3      | Library  | 14        | bob      |
| b3      | bob      | 0         | Library  |
| b4      | Library  | 5         | ace      |
| b4      | ace      | 3         | bob      |
| b4      | bob      | 4         | chi      |
| b4      | chi      | 5         | ace      |
| b4      | ace      | 0         | Library  |
| b5      | Library  | 14        | bob      |
| b5      | bob      | 0         | ace      |

---

## ✅ Sample Output


bob need to pay 2 for book b1
fine amount to be paid: None
bob need to pay 4 for book b3
ace need to pay 7 for book b4
fine amount to be paid: None


---
package week8;

public class Libray {
    String lender;
    String borrower;
    String book;
    int days;
    int fineAmount;

    
    public Libray(String book, String borrower, int days, String lender) {
        this.book = book;
        this.borrower = borrower;
        this.days = days;
        this.lender = lender;
    }

    

    public int getFineAmount() {
        return fineAmount;
    }

    public void setFineAmount(int fineAmount) {
        this.fineAmount = fineAmount;
    }

    public String getLender() {
        return lender;
    }

    public void setLender(String lender) {
        this.lender = lender;
    }

    public String getBorrower() {
        return borrower;
    }

    public void setBorrower(String borrower) {
        this.borrower = borrower;
    }

    public String getBook() {
        return book;
    }

    public void setBook(String book) {
        this.book = book;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Libray{");
        sb.append("lender=").append(lender);
        sb.append(", borrower=").append(borrower);
        sb.append(", book=").append(book);
        sb.append(", days=").append(days);
        sb.append(", fineAmount=").append(fineAmount);
        sb.append('}');
        return sb.toString();
    }

}
===============

import java.util.ArrayList;
import java.util.Arrays;

public class LibProblem {
    
    public static void main(String[] args) {

        // Input object creation (formatted)
        Libray lib1  = new Libray("b1",  "ace",  5,  "lib");
        Libray lib2  = new Libray("b1",  "bob",  7,  "ace");
        Libray lib3  = new Libray("b1",  "lib",  0,  "bob");

        Libray lib4  = new Libray("b2",  "dave", 1,  "lib");
        Libray lib5  = new Libray("b2",  "eve",  3,  "dave");
        Libray lib6  = new Libray("b2",  "lib",  0,  "eve");

        Libray lib7  = new Libray("b3",  "bob",  14, "lib");
        Libray lib8  = new Libray("b3",  "lib",  0,  "bob");

        Libray lib9  = new Libray("b4",  "ace",  5,  "lib");
        Libray lib10 = new Libray("b4",  "bob",  3,  "ace");
        Libray lib11 = new Libray("b4",  "chi",  4,  "bob");
        Libray lib12 = new Libray("b4",  "ace",  5,  "chi");
        Libray lib13 = new Libray("b4",  "lib",  0,  "ace");

        Libray lib14 = new Libray("b5", "bob", 14, "lib");
        Libray lib15 = new Libray("b5", "ace", 0, "bob");



        ArrayList<Libray> librays = new ArrayList<>();
        librays.addAll(Arrays.asList(
            lib1, lib2, lib3, lib4, lib5, lib6, lib7, lib8, lib9, lib10, lib11, lib12, lib13,lib14,lib15
        ));
        
        int totaldays = 0;
        int fineAmount = 0;
        String bookName = librays.getFirst().getBook();
        String lenderName = "";
        String borrowerName="";


        for (var lib : librays) {
            if (!bookName.equals(lib.getBook())) {
                if(borrowerName.equals("lib")){
                printFine(lenderName, totaldays, bookName, lib);
                }
                fineAmount = 0;
                totaldays = 0;
            }
            totaldays += lib.getDays();
            lenderName = lib.getLender();
            borrowerName=lib.getBorrower();
            bookName = lib.getBook();
        }
        // Print fine for the last group
        if(borrowerName.equals("lib")){
        printFine(lenderName, totaldays, bookName, librays.getLast());
        }
    }

    private static void printFine(String lenderName, int totaldays, String bookName, Libray lib) {
        if (totaldays > 10) {
            int fineAmount = totaldays - 10;
            lib.setFineAmount(fineAmount);
            System.out.println(lenderName + " need to pay " + fineAmount + " for book " + bookName);
        } else {
            System.out.println("fine amount to be paid: None");
        }
    }
}
=================================================
import java.util.*;
import java.util.stream.*;

public class LibraryProblem {

    static class Library {
        private final String book;
        private final String lender;
        private final int days;
        private final String borrowedFrom;

        public Library(String book, String lender, int days, String borrowedFrom) {
            this.book = book;
            this.lender = lender;
            this.days = days;
            this.borrowedFrom = borrowedFrom;
        }

        public String getBook() { return book; }
        public String getLender() { return lender; }
        public int getDays() { return days; }
        public String getBorrowedFrom() { return borrowedFrom; }
    }

    public static void main(String[] args) {
        List<Library> libraries = Arrays.asList(
            new Library("b1", "ace", 5, "lib"),
            new Library("b1", "bob", 7, "ace"),
            new Library("b1", "lib", 0, "bob"),
            new Library("b2", "dave", 1, "lib"),
            new Library("b2", "eve", 3, "dave"),
            new Library("b2", "lib", 0, "eve"),
            new Library("b3", "bob", 14, "lib"),
            new Library("b3", "lib", 0, "bob"),
            new Library("b4", "ace", 5, "lib"),
            new Library("b4", "bob", 3, "ace"),
            new Library("b4", "chi", 4, "bob"),
            new Library("b4", "ace", 5, "chi"),
            new Library("b4", "lib", 0, "ace")
        );

        // Group by book name and process
        libraries.stream()
            .collect(Collectors.groupingBy(Library::getBook))
            .forEach((book, transactions) -> {
                int totalDays = transactions.stream().mapToInt(Library::getDays).sum();
                int fine = Math.max(0, totalDays - 10);
                Library last = transactions.get(transactions.size() - 1);

                if (fine > 0) {
                    System.out.printf("Book: %s | Last Lender: %s | Fine: %d%n",
                            book, last.getLender(), fine);
                } else {
                    System.out.printf("Book: %s | No fine%n", book);
                }
            });
    }
}
===========================================
