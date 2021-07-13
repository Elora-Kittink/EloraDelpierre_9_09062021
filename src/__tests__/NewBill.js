import { fireEvent, getByTestId, screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import BillsUI from "../views/BillsUI.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import { ROUTES } from "../constants/routes";
import firebase from "../__mocks__/firebase.js";
window.alert = jest.fn();

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then message icon should be highlighted", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      const billIcon = $("#layout-icon2").css("background-color");
      const verticalLayout = $(".vertical-navbar").css("background-color");
      expect(billIcon !== verticalLayout).toBe(true);
    });
    //-------------------------------TEST CLASS----------------------------------
    test("Then it should display NewBill page", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      const newBill = screen.getByTestId("form-new-bill");
      expect(newBill).toBeTruthy();
    });
  });
  //------------------------------TEST METHODE-------------------------------------
  describe("When I am on NewBill page and I click on choisir un fichier", () => {
    describe("When I choose a .pdf document", () => {
      test("Then I stay on newBillPage, submit button is disabled", () => {
        window.alert.mockClear();
        document.body.innerHTML = NewBillUI();
        const input = screen.getByTestId("file");
        const fileTest = new File([""], "test.pdf", { type: "application/pdf" });
        const submitbtn = screen.getByTestId("btn-send-bill");
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname });
        };
        const firestore = null;
        const newBill = new NewBill({
          document,
          onNavigate,
          firestore,
          localStorage: window.localStorage,
        });
        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        input.addEventListener("change", handleChangeFile);
        userEvent.upload(input, fileTest);

        const newBillForm = screen.getByTestId("form-new-bill");
        expect(newBillForm).toBeTruthy();
        expect(window.alert).toHaveBeenCalledWith("Choisir un format d'image .jpeg ou .png ou .jpg");
      });
    });
    describe("When I choose a .jpeg file", () => {
      test("Then submit button allow me to submit", async () => {
        window.alert.mockClear();
        Object.defineProperty(window, "localStorage", {
          value: localStorageMock,
        });
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            type: "Employee",
          })
        );

        document.body.innerHTML = NewBillUI();
        const input = screen.getByTestId("file");
        const fileTest = new File(["test"], "test.jpeg", { type: "image/jpeg" });

        const submitbtn = screen.getByTestId("btn-send-bill");
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname });
        };
        const firestore = null;
        const newBill = new NewBill({
          document,
          onNavigate,
          firestore,
          localStorage: window.localStorage,
        });
        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        input.addEventListener("change", handleChangeFile);
        fireEvent.change(input, {
          target: {
            files: [fileTest],
          },
        });
        expect(handleChangeFile).toHaveBeenCalled();
        expect(input.files[0].name).toBe("test.jpeg");
      });
    });
    describe("When I am on NewBill and I choose a wrong extension type for image", () => {
      test("Then the error message should be appear", () => {
        Object.defineProperty(window, "localStorage", {
          value: localStorageMock,
        });

        window.localStorage.setItem(
          "user",
          JSON.stringify({
            type: "Employee",
          })
        );

        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname });
        };

        const firestore = null;

        const html = NewBillUI();
        document.body.innerHTML = html;

        const newBill = new NewBill({
          document,
          onNavigate,
          firestore,
          localStorage: window.localStorage,
        });

        const handleChangeFile = jest.fn(newBill.handleChangeFile);

        const file = screen.getByTestId("file");
        file.addEventListener("change", handleChangeFile);
        fireEvent.change(file, {
          target: {
            files: [new File(["text.txt"], "text.txt", { type: "text/txt" })],
          },
        });
        expect(handleChangeFile).toHaveBeenCalled();
        expect(file.files[0].name).toBe("text.txt");
      });
    });
    describe("When I choose a .png file", () => {
      test("Then submit button allow me to submit", () => {
        Object.defineProperty(window, "localStorage", {
          value: localStorageMock,
        });

        window.localStorage.setItem(
          "user",
          JSON.stringify({
            type: "Employee",
          })
        );

        document.body.innerHTML = NewBillUI();
        const input = screen.getByTestId("file");
        const fileTest = new File(["test"], "test.png", { type: "image/png" });

        const submitbtn = screen.getByTestId("btn-send-bill");
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname });
        };
        const firestore = null;
        const newBill = new NewBill({
          document,
          onNavigate,
          firestore,
          localStorage: window.localStorage,
        });
        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        input.addEventListener("change", handleChangeFile);
        fireEvent.change(input, {
          target: {
            files: [fileTest],
          },
        });

        expect(handleChangeFile).toHaveBeenCalled();
      });
    });
  });
  describe("When I am on NewBill page and I click on submit button", () => {
    describe("When I filled all the field correctly", () => {
      test("Then it should create the bill", () => {
        document.body.innerHTML = NewBillUI();

        const inputData = {
          type: "Transports",
          name: "Test",
          datepicker: "2000-10-17",
          amount: "1",
          vat: "20",
          pct: "20",
          commentary: "Test",
          file: new File(["test"], "test.png", { type: "image/png" }),
        };

        const formNewBill = screen.getByTestId("form-new-bill");
        const expenseNameInput = screen.getByTestId("expense-name");
        const expenseTypeInput = screen.getByTestId("expense-type");
        const datepickerInput = screen.getByTestId("datepicker");
        const amountInput = screen.getByTestId("amount");
        const TVAInput = screen.getByTestId("vat");
        const PCTInput = screen.getByTestId("pct");
        const commentaryInput = screen.getByTestId("commentary");
        const fileInput = screen.getByTestId("file");

        fireEvent.change(expenseTypeInput, {
          target: { value: inputData.type },
        });
        expect(expenseTypeInput.value).toBe(inputData.type);

        fireEvent.change(expenseNameInput, {
          target: { value: inputData.name },
        });
        expect(expenseNameInput.value).toBe(inputData.name);

        fireEvent.change(datepickerInput, {
          target: { value: inputData.datepicker },
        });
        expect(datepickerInput.value).toBe(inputData.datepicker);

        fireEvent.change(amountInput, {
          target: { value: inputData.amount },
        });
        expect(amountInput.value).toBe(inputData.amount);

        fireEvent.change(TVAInput, {
          target: { value: inputData.vat },
        });
        expect(TVAInput.value).toBe(inputData.vat);

        fireEvent.change(PCTInput, {
          target: { value: inputData.pct },
        });
        expect(PCTInput.value).toBe(inputData.pct);

        fireEvent.change(commentaryInput, {
          target: { value: inputData.commentary },
        });
        expect(commentaryInput.value).toBe(inputData.commentary);

        userEvent.upload(fileInput, inputData.file);
        expect(fileInput.files[0]).toStrictEqual(inputData.file);
        expect(fileInput.files).toHaveLength(1);
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: jest.fn(() =>
              JSON.stringify({
                email: "test@mail.com",
              })
            ),
          },
          writable: true,
        });

        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname });
        };

        const newBill = new NewBill({
          document,
          onNavigate,
          localStorage: window.localStorage,
        });

        const handleSubmit = jest.fn(newBill.handleSubmit);
        formNewBill.addEventListener("submit", handleSubmit);
        fireEvent.submit(formNewBill);
        expect(handleSubmit).toHaveBeenCalled();
      });
    });
  });
});

//---------------------------------POST-----------------------------------------------

describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to Bills", () => {
    test("Add bill to mock API POST", async () => {
      const newBill = {
        id: "654d6szd54d65f4d5f4df5d4f",
        vat: "10",
        fileUrl: "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
        status: "pending",
        type: "Hôtel",
        commentary: "newbill POST",
        name: "POST",
        fileName: "preview-facture-free-201801-pdf-1.jpg",
        date: "2021-07-21",
        amount: 100,
        commentAdmin: "ok",
        email: "a@a",
        pct: 20,
      };
      const postSpy = jest.spyOn(firebase, "post");
      const bills = await firebase.post(newBill);
      expect(postSpy).toHaveBeenCalledTimes(1);
      expect(bills.data.length).toBe(5);
    });
    test("Add bill to API and fails with 404 message error", async () => {
      firebase.post.mockImplementationOnce(() => Promise.reject(new Error("Erreur 404")));
      const html = BillsUI({ error: "Erreur 404" });
      document.body.innerHTML = html;
      const message = await screen.getByText(/Erreur 404/);
      expect(message).toBeTruthy();
    });
    test("Add bill to API and fails with 500 message error", async () => {
      firebase.post.mockImplementationOnce(() => Promise.reject(new Error("Erreur 500")));
      const html = BillsUI({ error: "Erreur 500" });
      document.body.innerHTML = html;
      const message = await screen.getByText(/Erreur 500/);
      expect(message).toBeTruthy();
    });
  });
});
