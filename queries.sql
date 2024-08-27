-- Create table that has only income
CREATE TABLE income (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE,
    job_income DECIMAL(12, 2),
    side_hustle_income DECIMAL(12, 2),
    stock_income DECIMAL(12, 2),
    other DECIMAL(12, 2),
    total_income DECIMAL(12, 2)
);
-- Create table that has only expenses
CREATE TABLE expense (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE,
    housing DECIMAL(12, 2),
    food DECIMAL(12, 2),
    transportation DECIMAL(12, 2),
    insurance DECIMAL(12, 2),
    entertainment DECIMAL(12, 2),
    other DECIMAL(12, 2),
    total_expense DECIMAL(12, 2)
);























