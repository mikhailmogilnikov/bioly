// import { Trans } from "@lingui/react/macro";
// import { useRef } from "react";
// import {
//   type BentoItem,
//   BentoItemType,
//   generateNewBentoItemDefaults,
// } from "@/features/bento/model/bento.type";
// import {
//   AArrowUpIcon,
//   type AArrowUpIconHandle,
// } from "@/shared/ui/animated-icons/a-arrow-up";
// import {
//   BookTextIcon,
//   type BookTextIconHandle,
// } from "@/shared/ui/animated-icons/book-text";
// import {
//   GalleryHorizontalEndIcon,
//   type GalleryHorizontalEndIconHandle,
// } from "@/shared/ui/animated-icons/gallery";
// import { LinkIcon, type LinkIconHandle } from "@/shared/ui/animated-icons/link";
// import { PlusIcon, type PlusIconHandle } from "@/shared/ui/animated-icons/plus";
// import type { ScanTextIconHandle } from "@/shared/ui/animated-icons/scan-text";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/shared/ui/kit/overlays/dropdown-menu";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/shared/ui/kit/overlays/react-tooltip";
// import { useProfile } from "../../profile/use-profile";

// export const EditBarNewItem = () => {
//   const { bento, updateProfile } = useProfile(
//     (state) => ({
//       bento: state.profile.bento,
//       updateProfile: state.updateProfile,
//     }),
//     "shallow"
//   );

//   const plusIconRef = useRef<PlusIconHandle>(null);

//   const galleryHorizontalEndIconRef =
//     useRef<GalleryHorizontalEndIconHandle>(null);
//   const scanTextIconRef = useRef<ScanTextIconHandle>(null);
//   const linkIconRef = useRef<LinkIconHandle>(null);
//   const aArrowUpIconRef = useRef<AArrowUpIconHandle>(null);
//   const bookTextIconRef = useRef<BookTextIconHandle>(null);

//   const handleAddItem = (type: BentoItemType) => {
//     const newItem: BentoItem<BentoItemType> = generateNewBentoItemDefaults(
//       bento.length + 1,
//       type
//     );

//     const newBento = [...bento, newItem];

//     updateProfile({
//       bento: newBento,
//     });

//     window.scrollTo({
//       top: document.body.scrollHeight,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <DropdownMenu
//       onOpenChange={(isOpen) => {
//         if (isOpen) {
//           plusIconRef.current?.startAnimation();

//           queueMicrotask(() => {
//             galleryHorizontalEndIconRef.current?.startAnimation();
//             scanTextIconRef.current?.startAnimation();
//             linkIconRef.current?.startAnimation();
//             aArrowUpIconRef.current?.startAnimation();
//             bookTextIconRef.current?.startAnimation();
//           });
//         } else {
//           plusIconRef.current?.stopAnimation();
//         }
//       }}
//     >
//       <DropdownMenuTrigger className="pressable size-12 cursor-pointer rounded-full border border-foreground/8 bg-default/50 backdrop-blur-md">
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <div className="flex size-full items-center justify-center">
//               <PlusIcon
//                 className="text-foreground"
//                 ref={plusIconRef}
//                 size={26}
//               />
//             </div>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>
//               <Trans>Add a new block</Trans>
//             </p>
//           </TooltipContent>
//         </Tooltip>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         <DropdownMenuLabel>
//           <Trans>New block</Trans>
//         </DropdownMenuLabel>

//         <DropdownMenuItem
//           className="text-foreground"
//           onClick={() => handleAddItem(BentoItemType.GALLERY)}
//           onPointerEnter={() =>
//             galleryHorizontalEndIconRef.current?.startAnimation()
//           }
//           onPointerLeave={() =>
//             galleryHorizontalEndIconRef.current?.stopAnimation()
//           }
//         >
//           <GalleryHorizontalEndIcon
//             className="opacity-50"
//             ref={galleryHorizontalEndIconRef}
//             size={20}
//           />
//           <Trans>Media gallery</Trans>
//         </DropdownMenuItem>
//         {/* <DropdownMenuItem
//           disabled
//           onPointerEnter={() => scanTextIconRef.current?.startAnimation()}
//           onPointerLeave={() => scanTextIconRef.current?.stopAnimation()}
//         >
//           <ScanTextIcon
//             ref={scanTextIconRef}
//             size={20}
//             className="opacity-50"
//           />
//           Text
//         </DropdownMenuItem> */}
//         <DropdownMenuItem
//           onClick={() => handleAddItem(BentoItemType.LINK)}
//           onPointerEnter={() => linkIconRef.current?.startAnimation()}
//           onPointerLeave={() => linkIconRef.current?.stopAnimation()}
//         >
//           <LinkIcon className="opacity-50" ref={linkIconRef} size={20} />
//           <Trans>Link</Trans>
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem
//           onClick={() => handleAddItem(BentoItemType.TITLE)}
//           onPointerEnter={() => aArrowUpIconRef.current?.startAnimation()}
//           onPointerLeave={() => aArrowUpIconRef.current?.stopAnimation()}
//         >
//           <AArrowUpIcon
//             className="opacity-50"
//             ref={aArrowUpIconRef}
//             size={20}
//           />
//           <Trans>Title</Trans>
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => handleAddItem(BentoItemType.DESCRIPTION)}
//           onPointerEnter={() => bookTextIconRef.current?.startAnimation()}
//           onPointerLeave={() => bookTextIconRef.current?.stopAnimation()}
//         >
//           <BookTextIcon
//             className="opacity-50"
//             ref={bookTextIconRef}
//             size={20}
//           />
//           <Trans>Description</Trans>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

export const EditBarNewItem = () => null;
