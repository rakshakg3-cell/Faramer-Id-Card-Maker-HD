
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates a 2-page PDF from the front and back of the ID card.
 * Optimized for standard PVC card size (85.6mm x 54mm) with ULTRA HD quality.
 */
export const generatePDF = async (element: HTMLElement, farmerName: string): Promise<boolean> => {
  const frontSide = element.querySelector('#id-card-front') as HTMLElement;
  const backSide = element.querySelector('#id-card-back') as HTMLElement;

  if (!frontSide || !backSide) {
    console.error("ID Card elements not found in DOM");
    return false;
  }

  try {
    console.log("Starting ULTRA HD PDF generation...");
    
    // Scale 4.5 for Ultra-HD quality (higher scale = more pixels)
    const canvasOptions = {
      scale: 4.5,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      width: 648,
      height: 408,
      onclone: (clonedDoc: Document) => {
        const clonedFront = clonedDoc.getElementById('id-card-front');
        const clonedBack = clonedDoc.getElementById('id-card-back');
        if (clonedFront) clonedFront.style.transform = 'none';
        if (clonedBack) clonedBack.style.transform = 'none';
      }
    };

    // Capture Front with maximum quality
    const frontCanvas = await html2canvas(frontSide, canvasOptions);
    console.log("Front side captured");

    // Capture Back with maximum quality
    const backCanvas = await html2canvas(backSide, canvasOptions);
    console.log("Back side captured");

    // Initialize PDF (Standard ID-1 size: 85.6mm x 53.98mm)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [85.6, 54]
    });

    // Page 1: Front
    // Using compression level 1.0 (no compression) for maximum crispness
    const frontImgData = frontCanvas.toDataURL('image/jpeg', 1.0);
    pdf.addImage(frontImgData, 'JPEG', 0, 0, 85.6, 54, undefined, 'SLOW');

    // Page 2: Back
    pdf.addPage([85.6, 54], 'landscape');
    const backImgData = backCanvas.toDataURL('image/jpeg', 1.0);
    pdf.addImage(backImgData, 'JPEG', 0, 0, 85.6, 54, undefined, 'SLOW');

    // Save with sanitized filename
    const safeName = (farmerName || 'Farmer').replace(/[^a-z0-9]/gi, '_');
    pdf.save(`AgroStack_UHD_${safeName}.pdf`);
    
    console.log("Ultra HD PDF download triggered successfully");
    return true;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    alert('PDF download failed. Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    return false;
  }
};
