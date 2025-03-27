interface Props {
  title: string;
  data: string;
}

const Text = ({ title, data }: Props) => {
  return ( 
    <>
      <div className="flex justify-center items-center gap-2">
        <h4 className="text-lg text-azul">{title}</h4>
        <p className="text-lg text-branco">{data}</p>
      </div>
    </>
   );
}
 
export default Text;