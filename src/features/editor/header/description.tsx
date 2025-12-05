import { BasicTextEditor } from "../text-editor";

export const EditDescription = () => {
  // const { t } = useLingui();

  // const { description, updateMainField } = useProfile(
  //   (state) => ({
  //     description: state.profile.description,
  //     updateMainField: state.updateMainField,
  //   }),
  //   "shallow"
  // );

  // const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   updateMainField("description", e.target.value);
  // };

  return <BasicTextEditor className="z-2 px-1" />;
};
