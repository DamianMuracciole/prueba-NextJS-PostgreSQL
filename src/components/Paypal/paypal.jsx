'use client'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from '@/components/Paypal/styles.module.css'

export default function Paypal() {
    return (
<PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons 
              style={{ 
                layout: 'vertical', 
                color:'black',
                label: 'buynow',
                height: 36,
                shape: "pill"
              }}
              className={styles.paypalbtn}

            />
        </PayPalScriptProvider>
    );
}