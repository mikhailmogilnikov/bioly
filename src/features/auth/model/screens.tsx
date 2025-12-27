import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { EnterEmailScreen } from "../views/enter-email";
import { LoginVerifyOtpScreen } from "../views/login/verify-otp-screen";
import { EnterSlugScreen } from "../views/signup/enter-slug-screen";
import { SignupVerifyOtpScreen } from "../views/signup/verify-otp-screen";

export const AUTH_SCREENS = {
  ENTER_EMAIL: "enter-email",
  LOGIN_VERIFY_OTP: "login-verify-otp",
  SIGNUP_ENTER_SLUG: "signup-enter-slug",
  SIGNUP_VERIFY_OTP: "signup-verify-otp",
} as const;

export type AuthScreen = (typeof AUTH_SCREENS)[keyof typeof AUTH_SCREENS];

interface AuthScreenData {
  title: MessageDescriptor;
  description: MessageDescriptor;
  component: React.ReactNode;
}

export const AUTH_SCREENS_DATA: Record<AuthScreen, AuthScreenData> = {
  [AUTH_SCREENS.ENTER_EMAIL]: {
    title: msg`Getting started`,
    description: msg`Create an account or sign in to your existing. No credit card required.`,
    component: <EnterEmailScreen />,
  },
  [AUTH_SCREENS.LOGIN_VERIFY_OTP]: {
    title: msg`Confirmation`,
    description: msg`We sent a one-time code to your email. Enter it below to continue.`,
    component: <LoginVerifyOtpScreen />,
  },
  [AUTH_SCREENS.SIGNUP_ENTER_SLUG]: {
    title: msg`Welcome!`,
    description: msg`Enter your unique url link to get started. You can change it later.`,
    component: <EnterSlugScreen />,
  },
  [AUTH_SCREENS.SIGNUP_VERIFY_OTP]: {
    title: msg`Verify your email`,
    description: msg`Verify your email to continue`,
    component: <SignupVerifyOtpScreen />,
  },
} as const;
