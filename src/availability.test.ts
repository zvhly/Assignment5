import { describe, expect, it } from "vitest";
import { checkAvailability, isValidTimeRange } from "@/availability";

describe("Smart Campus Room Availability", () => {
  const now = 540;
  const existing = [{ start: 600, end: 660 }];

  it("allows bookings that touch an existing booking endpoint", () => {
    const result = checkAvailability(660, 720, now, false, existing);
    expect(result.kind).toBe("available");
  });

  it("rejects an overlapping booking", () => {
    const result = checkAvailability(630, 690, now, false, existing);
    expect(result.kind).toBe("unavailable");
  });

  it("rejects a blocked room", () => {
    const result = checkAvailability(660, 720, now, true, existing);
    expect(result.kind).toBe("unavailable");
  });

  it("allows exactly 120 minutes", () => {
    const result = checkAvailability(660, 780, now, false, existing);
    expect(result.kind).toBe("available");
  });

  it("rejects more than 120 minutes", () => {
    const result = checkAvailability(660, 781, now, false, existing);
    expect(result.kind).toBe("unavailable");
  });

  it("rejects a booking that starts at the current time", () => {
    const result = checkAvailability(540, 600, now, false, []);
    expect(result.kind).toBe("unavailable");
  });

  it("rejects a booking starting strictly before the current time", () => {
    const result = checkAvailability(500, 520, now, false, []);
    expect(result.kind).toBe("unavailable");
  });

  it("rejects a zero-length interval where start equals end", () => {
    const result = checkAvailability(600, 600, now, false, []);
    expect(result.kind).toBe("unavailable");
  });

  it("allows a booking ending exactly when an existing booking starts", () => {
    const result = checkAvailability(560, 600, now, false, existing);
    expect(result.kind).toBe("available");
  });

  it("rejects reversed start and end times", () => {
    const result = checkAvailability(720, 660, now, false, []);
    expect(result.kind).toBe("unavailable");
  });

  it("rejects times outside the day bounds", () => {
    const result = checkAvailability(1380, 1500, now, false, []);
    expect(result.kind).toBe("unavailable");
  });

  it("rejects overlap with any existing booking", () => {
    const bookings = [
      { start: 600, end: 660 },
      { start: 720, end: 780 },
    ];

    const result = checkAvailability(700, 740, now, false, bookings);
    expect(result.kind).toBe("unavailable");
  });

  it("does not modify existing bookings", () => {
    const bookings = [{ start: 600, end: 660 }];
    const original = JSON.parse(JSON.stringify(bookings));

    checkAvailability(660, 720, now, false, bookings);

    expect(bookings).toEqual(original);
  });
});

describe("isValidTimeRange", () => {
  it("accepts a valid range", () => {
    expect(isValidTimeRange(540, 600)).toBe(true);
  });

  it("accepts the full day bounds 0 to 1440", () => {
    expect(isValidTimeRange(0, 1440)).toBe(true);
  });

  it("rejects a negative start", () => {
    expect(isValidTimeRange(-1, 600)).toBe(false);
  });

  it("rejects start equal to end", () => {
    expect(isValidTimeRange(600, 600)).toBe(false);
  });

  it("rejects start after end", () => {
    expect(isValidTimeRange(660, 600)).toBe(false);
  });

  it("rejects an end past the day bound", () => {
    expect(isValidTimeRange(1380, 1441)).toBe(false);
  });
});