"use client";

import useStore from "@/app/providers/store/useStore";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderPage() {
    const url = process.env.NEXT_PUBLIC_SERVER_URL
    const router = useRouter();
    const servicesOrder = useStore((state: any) => state.servicesOrder)
    const [loading, setLoading] = useState(false)
    const [isValidate, setIsValidate] = useState(false)
    const [validationError, setValidationError] = useState({
        name: false,
        address: false,
        email: false,
        numberPhone: false,
    })
    const [orderInfo, setOrderInfo] = useState({
        name: "",
        address: "",
        email: "",
        numberPhone: 0,
        services: servicesOrder
    });
    const orderInfoValidation = () => {
        if (orderInfo.name !== "" && orderInfo.address !== "" && orderInfo.email !== "" && String(orderInfo.numberPhone).length >= 8) return true

        return false
    }

    useEffect(() => {
        if (servicesOrder.length < 1) return router.push("/")
    }, [])
    useEffect(() => {
        validationErrorFunc()
    }, [orderInfo, isValidate])

    function validationErrorFunc() {
        if (!isValidate) return

        if (orderInfo.name === "") {
            setValidationError((prevValidationState) => ({ ...prevValidationState, name: true }))
        } else {
            setValidationError((prevValidationState) => ({ ...prevValidationState, name: false }))
        }
        if (orderInfo.address === "") {
            setValidationError((prevValidationState) => ({ ...prevValidationState, address: true }))
        } else {
            setValidationError((prevValidationState) => ({ ...prevValidationState, address: false }))
        }
        if (orderInfo.email === "") {
            setValidationError((prevValidationState) => ({ ...prevValidationState, email: true }))
        } else {
            setValidationError((prevValidationState) => ({ ...prevValidationState, email: false }))
        }
        if (String(orderInfo.numberPhone).length <= 8) {
            setValidationError((prevValidationState) => ({ ...prevValidationState, numberPhone: true }))
        } else {
            setValidationError((prevValidationState) => ({ ...prevValidationState, numberPhone: false }))
        }
    }
    async function orderingService() {
        try {
            setIsValidate(true)

            if (orderInfoValidation()) {
                setLoading(true)

                await axios.post(`${url}/items/pet_service_orders`, orderInfo)

                setIsValidate(false)
                router.push("/finish")
                setLoading(false)

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center flex-col">
            <button
                onClick={() => router.back()}
                className="w-48 hover:w-full hover:px-3 hover:py-3 mb-1 transition-all ease-in-out duration-200 flex items-center justify-center rounded-md border border-transparent py-2 text-base font-medium text-orange-600 shadow-sm bg-orange-100 sm:px-2"
            >
                <ArrowBackIosNewRounded />
            </button>
            <TextField
                label="Họ, tên"
                type="text"
                fullWidth
                margin="dense"
                color="warning"
                required
                onChange={(event) =>
                    setOrderInfo({ ...orderInfo, name: event.target.value })
                }
                error={validationError.name}
                helperText={validationError.name && <>Bạn chưa viết: Họ, tên</>}
            />
            <TextField
                label="Địa chỉ"
                type="text"
                fullWidth
                margin="dense"
                color="warning"
                required
                onChange={(event) =>
                    setOrderInfo({ ...orderInfo, address: event.target.value })
                }
                error={validationError.address}
                helperText={validationError.address && <>Bạn chưa viết: Địa chỉ</>}
            />
            <TextField
                label="E-mail"
                type="email"
                fullWidth
                margin="dense"
                color="warning"
                required
                onChange={(event) =>
                    setOrderInfo({ ...orderInfo, email: event.target.value })
                }
                error={validationError.email}
                helperText={validationError.email && <>Bạn chưa viết: E-mail</>}
            />
            <TextField
                label="Số điện thoại"
                type="number"
                fullWidth
                margin="dense"
                color="warning"
                required
                onChange={(event) =>
                    setOrderInfo({
                        ...orderInfo,
                        numberPhone: +event.target.value,
                    })
                }
                error={validationError.numberPhone}
                helperText={validationError.numberPhone && <>Bạn chưa viết: Số điện thoại</>}
            />
            <LoadingButton
                loading={loading}
                fullWidth
                variant="contained"
                size="large"
                color="warning"
                className="!mt-2 bg-orange-500 !py-3"
                onClick={orderingService}
            >
                Đặt dịch vụ
            </LoadingButton>
        </section>
    );
}