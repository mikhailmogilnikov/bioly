import type { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

import { CONFIG } from "@/shared/model/config";

import {
  Drawer,
  DrawerContent,
  type DrawerContentProps,
  DrawerFooter,
  type DrawerFooterProps,
  DrawerHeader,
  type DrawerHeaderProps,
  type DrawerProps,
} from "./drawer";
import {
  Modal,
  ModalContent,
  type ModalContentProps,
  ModalFooter,
  type ModalFooterProps,
  ModalHeader,
  type ModalHeaderProps,
  type ModalProps,
} from "./modal";

export interface AdaptiveModalProps {
  children?: ReactNode;
  open: boolean;
  onOpenChange: () => void;
  modalProps?: ModalProps;
  drawerProps?: DrawerProps;
}

const BREAKPOINT_MOBILE = CONFIG.BREAKPOINT_MOBILE;

export const AdaptiveModal = ({
  children,
  open,
  onOpenChange,
  modalProps,
  drawerProps,
}: AdaptiveModalProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE.toString());

  return isMobile ? (
    <Drawer onOpenChange={onOpenChange} open={open} {...drawerProps}>
      {children}
    </Drawer>
  ) : (
    <Modal onOpenChange={onOpenChange} open={open} {...modalProps}>
      {children}
    </Modal>
  );
};

interface AdaptiveModalHeaderProps {
  children?: ReactNode;
  drawerProps?: DrawerHeaderProps;
  modalProps?: ModalHeaderProps;
  onBack?: () => void;
}

export const AdaptiveModalHeader = ({
  children,
  drawerProps,
  modalProps,
  onBack,
  ...props
}: AdaptiveModalHeaderProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE.toString());

  return isMobile ? (
    <DrawerHeader onBack={onBack} {...drawerProps} {...props}>
      {children}
    </DrawerHeader>
  ) : (
    <ModalHeader onBack={onBack} {...modalProps} {...props}>
      {children}
    </ModalHeader>
  );
};

interface AdaptiveModalContentProps {
  children?: ReactNode;
  drawerProps?: DrawerContentProps;
  modalProps?: ModalContentProps;
}

export const AdaptiveModalContent = ({
  children,
  ...props
}: AdaptiveModalContentProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE.toString());

  const { drawerProps, modalProps } = props;

  return isMobile ? (
    <DrawerContent {...drawerProps}>{children}</DrawerContent>
  ) : (
    <ModalContent {...modalProps}>{children}</ModalContent>
  );
};

interface AdaptiveModalFooterProps {
  children?: ReactNode;
  drawerProps?: DrawerFooterProps;
  modalProps?: ModalFooterProps;
  cancelButton?: boolean;
}

export const AdaptiveModalFooter = ({
  children,
  cancelButton = false,
  ...props
}: AdaptiveModalFooterProps) => {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE.toString());

  const { drawerProps, modalProps } = props;

  return isMobile ? (
    <DrawerFooter cancelButton={cancelButton} {...drawerProps}>
      {children}
    </DrawerFooter>
  ) : (
    <ModalFooter cancelButton={cancelButton} {...modalProps}>
      {children}
    </ModalFooter>
  );
};
