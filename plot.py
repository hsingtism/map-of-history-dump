import datashader as ds, pandas as pd
from datashader.utils import export_image
from colorcet import fire

df = pd.read_csv('E:\\map-of-history\\final-dat\\2021.csv')

# cvs = ds.Canvas(plot_width=700, plot_height=700)
cvs = ds.Canvas(plot_width=1024, plot_height=512)
agg = cvs.points(df, "lon", "lat")
img = ds.tf.shade(agg, cmap=fire, how='eq_hist')
export_image(img, "2021", background="black", export_path="E:\\map-of-history\\images")
