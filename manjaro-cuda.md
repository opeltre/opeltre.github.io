# Installing CUDA and NVIDIA drivers in Manjaro

[arch-cuda]: https://wiki.archlinux.org/title/GPGPU#CUDA

Useful links:

- Arch Wiki : [CUDA][arch-cuda] (for comparison only)

- Arch Wiki : [NVIDIA](https://wiki.archlinux.org/title/NVIDIA#Installation) (for comparison only)

## 1. List present GPUs and select drivers

To see what GPUs are found run:
```
$ lspci -k | grep -A 2 -E "(VGA|3D)"
```
You should see an Nvidia GPU, and which kernel driver is currently being used. 

In case the driver is `nouveau` (the open source one), install the proprietary driver from "Manjaro Settings" > "Hardware Configuration" (hit Menu key and type "settings"). Reboot. 
After restart, the output of `lspci` should print `nvidia` as kernel driver in use. 

Manjaro has installed necessary packages and configured both the kernel and Xorg to use the nvidia driver. You can see which packages are currently installed by running `$ pacman -Qs nvidia`. You should already have `nvidia-utils` installed, and be able to see your device by running

```
$ nvidia-smi
``` 


## 2. Install Cuda

Install [cuda][arch-cuda] from the official repositories:
```
# pacman -S cuda
```
