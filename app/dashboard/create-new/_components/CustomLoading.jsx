import React from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "../../../../@/components/ui/alert-dialog.jsx";
import Image from 'next/image.js';

export default function CustomLoading({ loading }) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          {/* Required for accessibility */}
          <AlertDialogTitle>
            <span className="sr-only">Loading</span>
          </AlertDialogTitle>

          <div className='flex flex-col items-center my-10 justify-center'>
            <Image src='/loading.gif' alt='loading' width={100} height={100} />
            <h2>Generating Your Video... Do not Refresh</h2>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
