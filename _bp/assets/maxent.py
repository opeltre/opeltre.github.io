import json
import torch
import matplotlib.pyplot as plt

with open("transverse_DU.json") as f:
    data = json.load(f)
    D = torch.tensor(data["D"])
    U = torch.tensor(data["U"])

U0 = U[:,0,-1]
U1 = U[:,1,-1]
U2 = U[:,2, -1]

plt.plot(U2, color='orange')
plt.plot(U0, color='orange', linestyle='dotted')
plt.plot(U1, color='orange', linestyle='dashed')

plt.show()
