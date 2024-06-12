import {
  StripeUser,
  validateStripeAccount,
  validateStripeUser,
} from './validation'

describe('validateStripeUser', () => {
  test('returns 403 Forbidden when user is not a service provider', () => {
    const user: StripeUser = {
      id: 'cus_QCr43ki2s0ihCt',
      user_id: '277b6bcd-5330-48bd-9e61-60af4fd34747',
      type: 'CUSTOMER',
      onboarded: false,
      created_at: '2024-06-11T04:30:23.645123+00:00',
      updated_at: '2024-06-11T04:30:23.645123+00:00',
    }
    const result = validateStripeUser(user)
    const expected = { success: false, status: 403 }

    expect(result).toEqual(expected)
  })

  test('returns 409 Conflict when the user is already onboarded', () => {
    const user: StripeUser = {
      id: 'acct_1PQMLfICjAThvInZ',
      user_id: '277b6bcd-5330-48bd-9e61-60af4fd34747',
      type: 'SERVICE_PROVIDER',
      onboarded: true,
      created_at: '2024-06-11T04:30:23.645123+00:00',
      updated_at: '2024-06-11T04:30:23.645123+00:00',
    }
    const result = validateStripeUser(user)
    const expected = { success: false, status: 409 }

    expect(result).toEqual(expected)
  })

  test('returns success = true when the user is a service provider and is not onboarded', () => {
    const user: StripeUser = {
      id: 'acct_1PQMLfICjAThvInZ',
      user_id: '277b6bcd-5330-48bd-9e61-60af4fd34747',
      type: 'SERVICE_PROVIDER',
      onboarded: false,
      created_at: '2024-06-11T04:30:23.645123+00:00',
      updated_at: '2024-06-11T04:30:23.645123+00:00',
    }

    const result = validateStripeUser(user)
    const expected = { success: true }

    expect(result).toEqual(expected)
  })
})

describe('validateStripeAccount', () => {
  test('returns 409 if the account has already been onboarded', () => {
    const user = {
      id: 'acct_1PQMLfICjAThvInZ',
      object: 'account',
      details_submitted: true,
      email: 'jim.smith@email.com',
    } as const
    const result = validateStripeAccount(user)
    const expected = { success: false, status: 409 }

    expect(result).toEqual(expected)
  })

  test('returns success = true when has not been onboarded', () => {
    const user = {
      id: 'acct_1PQMLfICjAThvInZ',
      object: 'account',
      details_submitted: false,
      email: 'jim.smith@email.com',
    } as const

    const result = validateStripeAccount(user)
    const expected = { success: true }

    expect(result).toEqual(expected)
  })
})
