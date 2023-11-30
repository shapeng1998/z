// import { useRef, useState } from 'react';
// import { Button, type Form, Modal } from '@douyinfe/semi-ui';
// import { type FormApi } from '@douyinfe/semi-ui/lib/es/form';
// import { FullScreenFlexCenterLayout } from '@/components/full-screen-flex-center';
// import { MyForm, type MyFormValues } from '@/components/semi-components/my-form';
// import { useEvent } from '@/lib/hooks';
// import { sleep } from '@/lib/utils';

import { MyTable } from '@/components/semi-components/my-table';

// export const SemiPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const myFormRef = useRef<Form<MyFormValues>>(null);
//   const myFormApiRef = useRef<FormApi<MyFormValues>>();

//   const handleOk = useEvent(async () => {
//     if (!myFormRef.current || !myFormApiRef.current) {
//       return;
//     }

//     const myFormApi = myFormApiRef.current;
//     // const myFormApi = myFormRef.current.formApi;
//     try {
//       const myFormValues = await myFormApi.validate();
//       await sleep(200); // or await api.post(myFormValues);
//       console.info({ myFormValues });
//     } catch (e) {
//       console.error(e);
//     }

//     setShowModal(false);
//   });

//   return (
//     <FullScreenFlexCenterLayout>
//       <Button onClick={() => setShowModal(true)}>Click me</Button>
//       <Modal visible={showModal} onCancel={() => setShowModal(false)} onOk={handleOk}>
//         <MyForm
//           ref={myFormRef}
//           getFormApi={(formApi) => (myFormApiRef.current = formApi)}
//           initValues={{ username: 'John Doe', email: 'john@gmail.com' }}
//         />
//       </Modal>
//     </FullScreenFlexCenterLayout>
//   );
// };

export const SemiPage = () => <MyTable />;
