-- Create table that has only income
CREATE TABLE income (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE,
    total_income money,
    side_hustle_income money,
    stock_income money,
    other money
);
-- Create table that has only expenses
CREATE TABLE expense (
    id SERIAL NOT NULL PRIMARY KEY,
    date DATE,
    total_expense money,
    housing money,
    food money,
    transportation money,
    insurance money,
    other money
);























