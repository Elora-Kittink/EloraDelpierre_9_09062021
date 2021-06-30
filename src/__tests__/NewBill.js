import { fireEvent, getByTestId, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { bills } from "../fixtures/bills.js";
import { localStorageMock } from "../__mocks__/localStorage.js";

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
        expect(submitbtn.disabled).toBe(true);
        const newBillForm = screen.getByTestId("form-new-bill");
        expect(newBillForm).toBeTruthy();
      });
    });
    describe("When I choose a .jpeg file", () => {
      test("Then I submit button allow me to submit", () => {
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
        userEvent.upload(input, fileTest);
        console.log(input.files[0]);

        expect(handleChangeFile).toHaveBeenCalled();
        console.log(fileTest.name);
        console.log(fileTest.name.match(/.(jpg|jpeg|png)$/i));
        console.log(submitbtn.disabled);
        expect(submitbtn.disabled).toBe(false);
      });
    });
    describe("When I choose a .png file", () => {
      test("Then I submit button allow me to submit", () => {
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

        console.log(input.files[0]);

        expect(handleChangeFile).toHaveBeenCalled();
        console.log(fileTest.name);
        console.log(fileTest.name.match(/.(jpg|jpeg|png)$/i));
        console.log(submitbtn.disabled);
        expect(submitbtn.disabled).toBe(false);
      });
    });
  });
  describe("When I am on NewBill page and I click on submit button", () => {
    describe("When I filled all the field correctly", () => {
      test("Then it should create the bill", () => {
        const html = NewBillUI();
        document.body.innerHTML = html;
        expect(handleSubmit()).toHaveBeenCalled();
      });
    });
  });
});
