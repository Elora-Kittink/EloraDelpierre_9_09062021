import { fireEvent, getByTestId, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { bills } from "../fixtures/bills.js";

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
      test("Then I stay on newBillPage, an error alert appears and submit button is disabled", () => {
        document.body.innerHTML = NewBillUI();
        const input = screen.getByTestId("file");
        const fileTest = new File([""], "test.pdf", { type: "application/pdf" });
        const submitbtn = document.getElementById("btn-send-bill");
        expect(submitbtn.disabled).toBe(true);
        expect(window, "alert").toHaveBeenCalled();
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
