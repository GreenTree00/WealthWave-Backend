-- Create table that has only income
CREATE TABLE income (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE,
    job_income money,
    side_hustle_income money,
    stock_income money,
    other money,
    total_income money
);
-- Create table that has only expenses
CREATE TABLE expense (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE,
    housing money,
    food money,
    transportation money,
    insurance money,
    entertainment money,
    other money,
    total_expense money
);























