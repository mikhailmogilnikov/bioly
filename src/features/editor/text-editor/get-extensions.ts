import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import { Commands } from "./extensions/commands";
import { Muted } from "./extensions/muted";
import { Spoiler } from "./extensions/spoiler";
import { suggestion } from "./extensions/suggestion";

export const getBasicTextEditorExtensions = (
  options:
    | {
        placeholder?: string;
        isStatic?: boolean;
      }
    | undefined
) => {
  const { placeholder, isStatic = false } = options ?? {};

  return [
    Muted,
    Spoiler.configure({ isStatic }),
    Typography,
    Commands.configure({
      suggestion,
    }),
    ...(placeholder ? [Placeholder.configure({ placeholder })] : []),
    StarterKit.configure({
      trailingNode: false,
      undoRedo: false,
      codeBlock: false,
      link: {
        HTMLAttributes: {
          class: "editor-link",
        },
        openOnClick: isStatic,
        defaultProtocol: "https",
        // isAllowedUri: (url, ctx) => {
        //   try {
        //     // construct URL
        //     console.log(url, ctx);
        //     const parsedUrl = url.includes(":")
        //       ? new URL(url)
        //       : new URL(`${ctx.defaultProtocol}://${url}`);

        //     // use default validation
        //     if (!ctx.defaultValidate(parsedUrl.href)) {
        //       return false;
        //     }

        //     // disallowed protocols
        //     const disallowedProtocols = ["ftp", "file"];
        //     const protocol = parsedUrl.protocol.replace(":", "");

        //     if (disallowedProtocols.includes(protocol)) {
        //       return false;
        //     }

        //     // only allow protocols specified in ctx.protocols
        //     const allowedProtocols = ctx.protocols.map((p) =>
        //       typeof p === "string" ? p : p.scheme
        //     );

        //     if (!allowedProtocols.includes(protocol)) {
        //       return false;
        //     }

        //     // disallowed domains
        //     const disallowedDomains = [
        //       "example-phishing.com",
        //       "malicious-site.net",
        //     ];
        //     const domain = parsedUrl.hostname;

        //     if (disallowedDomains.includes(domain)) {
        //       return false;
        //     }

        //     // all checks have passed
        //     return true;
        //   } catch {
        //     return false;
        //   }
        // },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];

            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      },
    }),
  ];
};
