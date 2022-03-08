import { streakCounter } from "../src";
import { formattedDate } from "../src/lib";
import { JSDOM } from "jsdom";

const KEY = "streak";

describe("streakCounter", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDom = new JSDOM("", { url: "https://localhost" });
    mockLocalStorage = mockJSDom.window.localStorage;
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("should return a streak object with currentCount, startDate and lastLoginDate", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    expect(Object.prototype.hasOwnProperty.call(streak, "currentCount")).toBe(
      true
    );
    expect(Object.prototype.hasOwnProperty.call(streak, "startDate")).toBe(
      true
    );
    expect(Object.prototype.hasOwnProperty.call(streak, "lastLoginDate")).toBe(
      true
    );
  });
  it("should return a streak starting at 1 and keep track of lastLoginDate", () => {
    // Arrange
    const date = new Date();
    const dateFormatted = formattedDate(date);
    // Act
    const streak = streakCounter(mockLocalStorage, date);

    // Assert
    expect(streak.currentCount).toBe(1);
    expect(streak.lastLoginDate).toBe(dateFormatted);
  });

  it("should store the streak in localStorage", () => {
    // Arrange
    const date = new Date("2021-12-13");
    const key = "streak";
    // Act
    const streak = streakCounter(mockLocalStorage, date);

    // Assert
    const streakAsString = mockLocalStorage.getItem(key);
    expect(streakAsString).not.toBeNull();
  });

  describe("with a prepopulated streak", () => {
    let mockLocalStorage: Storage;
    let startDate: Date;
    beforeEach(() => {
      const mockJSDom = new JSDOM("", { url: "https://localhost" });
      mockLocalStorage = mockJSDom.window.localStorage;

      // Use date in past so it doesn't conflict if test uses date test runs.

      startDate = new Date("2021-12-12");

      const streak = {
        currentCount: 1,
        startDate: formattedDate(startDate),
        lastLoginDate: formattedDate(startDate),
      };

      mockLocalStorage.setItem("streak", JSON.stringify(streak));
    });

    afterEach(() => {
      mockLocalStorage.clear();
    });

    it("should return the streak from localStorage", () => {
      // Arrange
      const date = new Date("2021-12-13");
      // Act
      const streak = streakCounter(mockLocalStorage, date);

      // Assert
      expect(streak.lastLoginDate).toBe(formattedDate(date));
      expect(streak.startDate).toBe(formattedDate(startDate));
    });
    it("should increment the counter", () => {
      // Arrange
      const date = new Date("2021-12-13");

      // Act
      const streak = streakCounter(mockLocalStorage, date);

      // Assert
      expect(streak.currentCount).toBe(2);
    });

    it("should not increment for nonconsecutive days", () => {
      const date = new Date("2021-12-15");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(1);
    });

    it("should reset if not consecutive days", () => {
      const date = new Date("2021-12-13");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.currentCount).toBe(2);

      const date2 = new Date("2021-12-15");
      const streak2 = streakCounter(mockLocalStorage, date2);
      expect(streak2.currentCount).toBe(1);
    });

    it("should update the lastLoginDate", () => {
      const date = new Date("2021-12-13");
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.lastLoginDate).toBe(formattedDate(date));
    });
    it("should not reset on same day", () => {
      const date = new Date("2021-12-13");

      const streak = streakCounter(mockLocalStorage, date);
      expect(streak.currentCount).toBe(2);

      const date2 = new Date("2021-12-13");
      const streak2 = streakCounter(mockLocalStorage, date2);
      expect(streak2.currentCount).toBe(2);
    });
  });
});
