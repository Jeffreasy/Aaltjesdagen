import { describe, it, expect } from 'vitest';
import { formatDate, formatDateWithYear, formatTime, getYear } from '../../../packages/design-system/src/utils/dates';

describe('Utility: Date Functions', () => {

    describe('formatDate()', () => {
        it('should format date to Dutch locale without year', () => {
            const result = formatDate('2024-06-15');

            // Should contain day number and month name
            expect(result).toContain('15');
            expect(result).toContain('juni');
            // Should NOT contain year
            expect(result).not.toContain('2024');
        });

        it('should handle Date objects', () => {
            const date = new Date('2024-12-25');
            const result = formatDate(date);

            expect(result).toContain('25');
            expect(result).toContain('december');
        });

        it('should return empty string for empty input', () => {
            expect(formatDate('')).toBe('');
        });
    });

    describe('formatDateWithYear()', () => {
        it('should format date with year in Dutch locale', () => {
            const result = formatDateWithYear('2024-06-15');

            expect(result).toContain('15');
            expect(result).toContain('juni');
            expect(result).toContain('2024');
        });

        it('should return empty string for empty input', () => {
            expect(formatDateWithYear('')).toBe('');
        });
    });

    describe('formatTime()', () => {
        it('should format time to HH:MM format', () => {
            const result = formatTime('2024-06-15T14:30:00');

            expect(result).toMatch(/\d{2}:\d{2}/); // Matches HH:MM pattern
            expect(result).toContain('14');
            expect(result).toContain('30');
        });

        it('should handle Date objects', () => {
            const date = new Date('2024-06-15T09:05:00');
            const result = formatTime(date);

            expect(result).toMatch(/\d{2}:\d{2}/);
        });

        it('should return empty string for empty input', () => {
            expect(formatTime('')).toBe('');
        });
    });

    describe('getYear()', () => {
        it('should extract year from date string', () => {
            const year = getYear('2024-06-15');
            expect(year).toBe(2024);
        });

        it('should extract year from Date object', () => {
            const date = new Date('2025-12-31');
            const year = getYear(date);
            expect(year).toBe(2025);
        });

        it('should return current year for empty input', () => {
            const currentYear = new Date().getFullYear();
            expect(getYear('')).toBe(currentYear);
        });
    });
});
