import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

const INITIAL_BALANCE = 1533
const EXTRA_WITHDRAW_AMOUNT = 1600
const WITHDRAW_AMOUNT = 500
const EXTRA_TRANSFER_AMOUNT = 2000
const TRANSFER_AMOUNT = 1000
const DEPOSIT_AMOUNT = 200

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)

    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)

    expect(() => bankAccount.withdraw(EXTRA_WITHDRAW_AMOUNT)).toThrowError(InsufficientFundsError)
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)
    const recipientAccount = getBankAccount(INITIAL_BALANCE)

    expect(() => bankAccount.transfer(EXTRA_TRANSFER_AMOUNT, recipientAccount)).toThrowError(InsufficientFundsError)
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)

    expect(() => bankAccount.transfer(TRANSFER_AMOUNT, bankAccount)).toThrowError(TransferFailedError)
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)
    const totalSum = DEPOSIT_AMOUNT + INITIAL_BALANCE
    bankAccount.deposit(DEPOSIT_AMOUNT)

    expect(bankAccount.getBalance()).toBe(totalSum)
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)
    const remainingBalance = INITIAL_BALANCE - WITHDRAW_AMOUNT
    bankAccount.withdraw(WITHDRAW_AMOUNT)

    expect(bankAccount.getBalance()).toBe(remainingBalance)
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)
    const recipientAccount = getBankAccount(INITIAL_BALANCE)
    const remainingBalance = INITIAL_BALANCE - TRANSFER_AMOUNT 
    bankAccount.transfer(TRANSFER_AMOUNT, recipientAccount)

    expect(bankAccount.getBalance()).toBe(remainingBalance)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)
    const mockFetchBalance = jest.spyOn(bankAccount, 'fetchBalance').mockReturnValue(Promise.resolve(1))
    const result = await bankAccount.fetchBalance()

    expect(typeof result).toBe('number')
    mockFetchBalance.mockRestore()
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)
    const mockFetchBalance = jest.spyOn(bankAccount, 'fetchBalance').mockReturnValue(Promise.resolve(100))
    await bankAccount.synchronizeBalance()

    expect(bankAccount.getBalance()).toBe(100)
    mockFetchBalance.mockRestore()
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE)
    const mockFetchBalance = jest.spyOn(bankAccount, 'fetchBalance').mockReturnValue(Promise.resolve(null))

    expect(bankAccount.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError)
    mockFetchBalance.mockRestore()
  });
});
