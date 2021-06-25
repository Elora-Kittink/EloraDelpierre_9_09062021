import { fireEvent, getByTestId, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import BillsUI from "../views/BillsUI.js";
import Bills from "../containers/Bills.js";
import { bills } from "../fixtures/bills.js";
import firebase from "../__mocks__/firebase.js";
import { handleClickNewBill } from "../containers/Bills.js";
import { handleClickIconEye } from "../containers/Bills.js";

describe("Given I am connected as an employee", () => {
  describe("when Bills page is loading", () => {
    test("Then Loading page should be displayed", () => {
      const html = BillsUI({ data: bills, loading: true });
      document.body.innerHTML = html;
      const loadingMessage = screen.getByTestId("loading-message");
      expect(loadingMessage).toBeTruthy();
    });
  });
  describe("When there is an error", () => {
    test("Then Error page should be displayed", () => {
      const html = BillsUI({ data: bills, error: true });
      document.body.innerHTML = html;
      const errorMessage = screen.getByTestId("error-message");
      expect(errorMessage).toBeTruthy();
    });
  });
  describe("When I am on Bills Page", () => {
    test("Then it should display Bills page", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const billsContent = screen.getByTestId("bills-content");
      expect(billsContent).toBeTruthy();
    });
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const billIcon = $("#layout-icon1").css("background-color");
      const verticalLayout = $(".vertical-navbar").css("background-color");
      //to-do write expect expression
      expect(billIcon !== verticalLayout).toBe(true);
    });
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map((a) => a.innerHTML);
      const antiChrono = (a, b) => (a < b ? 1 : -1);
      const datesSorted = [...dates].sort(antiChrono);
      expect(dates).toEqual(datesSorted);
    });
  });
  describe("when I am on Bills page ans I click on eye icon", () => {
    test("Then it should display a modale", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const eyeIcon = screen.getAllByTestId("icon-eye");
      const modale = screen.getByTestId("modale-icon-eye");
      userEvent.click(eyeIcon); //simule un evenement click
      expect(handleClickIconEye).toHaveBeenCalled();
      expect(modale).toBeTruthy();
    });
  });
});

// describe("Given I am connected as an employee", () => {
//   test("Then it create a new instance of bills", () => {
//     const html = BillsUI({ data: [] });
//     document.body.innerHTML = html;
//     const result = new Bills({ document, onNavigate, firestore, localStorage });
//     expect(result).toBeInstanceOf(Bills);
//   });
//   test("then it should display Bills page", () => {});
// });

// describe("Given I am connected as an employee", () => {
//   describe("When I am on Bills page but it is loading", () => {
//     test("Then, Loading page should be rendered", () => {
//       const html = BillsUI({ loading: true });
//       document.body.innerHTML = html;
//       expect(screen.getAllByText("Loading...")).toBeTruthy();
//     });
//   });
//   describe("When I am on Bills page but back-end send an error message", () => {
//     test("Then, Error page should be rendered", () => {
//       const html = BillsUI({ error: "some error message" });
//       document.body.innerHTML = html;
//       expect(screen.getAllByText("Erreur")).toBeTruthy();
//     });
//   });
// });

describe("Given I am connected as an employee", () => {
  describe("when I am on Bills page and I click on nouvelle note", () => {
    test("Then NewBill page should be displayed", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const newBillbtn = screen.getByTestId("btn-new-bill");
      const newBillForm = screen.getByTestId("form-new-bill"); // dans NewBillUI
      userEvent.click(newBillbtn);
      expect(handleClickNewBill).toHaveBeenCalled();
      expect(newBillForm).toBeTruthy();
    });
  });
});

// test d'integration GET

// describe("Given I am a user connected as Employee", () => {
//   describe("When I navigate to Bills", () => {
//     test("fetches bills from mock API GET", async () => {
//        const getSpy = jest.spyOn(firebase, "get")
//        const bills = await firebase.get()
//        expect(getSpy).toHaveBeenCalledTimes(1)
//        expect(bills.data.length).toBe(4)
//     })
//     test("fetches bills from an API and fails with 404 message error", async () => {
//       firebase.get.mockImplementationOnce(() =>
//         Promise.reject(new Error("Erreur 404"))
//       )
//       const html = BillsdUI({ error: "Erreur 404" })
//       document.body.innerHTML = html
//       const message = await screen.getByText(/Erreur 404/)
//       expect(message).toBeTruthy()
//     })
//     test("fetches messages from an API and fails with 500 message error", async () => {
//       firebase.get.mockImplementationOnce(() =>
//         Promise.reject(new Error("Erreur 500"))
//       )
//       const html = BillsdUI({ error: "Erreur 500" })
//       document.body.innerHTML = html
//       const message = await screen.getByText(/Erreur 500/)
//       expect(message).toBeTruthy()
//     })
//   })
// })
