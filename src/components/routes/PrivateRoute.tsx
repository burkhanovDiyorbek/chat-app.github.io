import { Navigate, Outlet } from "react-router-dom";
// import { checkAuth } from "../../firebase/services";
// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
export default function PrivateRoute() {
  //   const [accepted, setAccepted] = useState(false);
  //   let token: string | null = localStorage.getItem('uuid');
  //   const { isPending, error, data } = useQuery();
  //   useEffect(() => {}, [token]);

  //   console.log(accepted);
  const bool = true;
  return bool ? <Outlet /> : <Navigate to="/register" />;
}

// 1. frineds list shuni chiqarish kerak
// 2. search ni qilamiz va debounce bilan orab olamiz input value va ui ga resultni chiqaramiz
// 3. sms ni royxatini ui ga chiqarish
// 4.zustand organaman
// 5. sms yozadigan jonatadigan qilib firebasega saqlash kerak
// 6. sms larni livesnapshotda eshitib turish kerak 2ta taraf ham a va b userlar input bo'sh bo'lsa jonatilmasligi kerak
// 7. username ni update qilish modal logikasini yozish kerak,modal ochilganda default current userni usernameni inputga default berish kerak
